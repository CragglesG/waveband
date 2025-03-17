import os
import folium
import pyModeS as pms
from pyaudio import PyAudio, paInt16
from openai import OpenAI
from geopy import distance as gd
from dotenv import load_dotenv
from rtlsdr import RtlSdrTcpClient

print("Calculating weather near you...", end="\r")

load_dotenv()

LATITUDE = float(os.getenv("SERVER_LATITUDE", 0))
LONGITUDE = float(os.getenv("SERVER_LONGITUDE", 0))

directions = {
    "N": [0, 22.4],
    "NNE": [22.5, 44.9],
    "NE": [45, 67.4],
    "ENE": [67.5, 89.9],
    "E": [90, 112.4],
    "ESE": [112.5, 134.9],
    "SE": [135, 157.4],
    "SSE": [157.5, 179.9],
    "S": [180, 202.4],
    "SSW": [202.5, 224.9],
    "SW": [225, 247.4],
    "WSW": [247.5, 269.9],
    "W": [270, 292.4],
    "WNW": [292.5, 314.9],
    "NW": [315, 337.4],
    "NNW": [337.5, 359.9],
}

direction_words = {
    "N": "north",
    "NNE": "north-northeast",
    "NE": "northeast",
    "ENE": "east-northeast",
    "E": "east",
    "ESE": "east-southeast",
    "SE": "southeast",
    "SSE": "south-southeast",
    "S": "south",
    "SSW": "south-southwest",
    "SW": "southwest",
    "WSW": "west-southwest",
    "W": "west",
    "WNW": "west-northwest",
    "NW": "northwest",
    "NNW": "north-northwest",
}

client = OpenAI()


def get_direction(degrees):
    degrees = format(degrees, ".1f")
    for direction, degree_list in directions.items():
        if degree_list[0] <= degrees <= degree_list[1]:
            return direction


sdr = RtlSdrTcpClient(
    hostname=os.getenv("SERVER_HOST", "0.0.0.0"),
    port=int(os.getenv("SERVER_PORT", 8000)),
    test_mode_enabled=True,
)

sdr.sample_rate = 2.4e6  # Hz
sdr.center_freq = 109e7  # 1090MHz, ADS-B frequency
sdr.gain = "auto"

sdr.open()
print("Reading samples...             ", end="\r")
samples = sdr.read_samples(256)
sdr.close()

weather = []
print("Processing samples...", end="\r")

for msg in samples:
    msg = str(msg)
    if pms.bds.infer(msg, mrar=True) != "BDS44":
        continue
    alt = pms.adsb.altitude(msg) if type(pms.adsb.altitude(msg)) == float else 30000.0
    temp = pms.commb.temp44(msg)[0] + (1.98 * (alt / 1000))
    weather.append(
        (
            pms.adsb.surface_position_with_ref(msg, LATITUDE, LONGITUDE),
            alt,
            pms.commb.hum44(msg),
            pms.commb.p44(msg),
            get_direction(pms.commb.wind44(msg)[1]),
            pms.commb.wind44(msg)[0],
            temp,
        )
    )

if len(weather) == 0:
    print("No weather data found.")
    exit()

weather.sort(key=lambda x: gd.distance((LATITUDE, LONGITUDE), x[0]).km)

close_weather = weather[:5]
distances = [gd.distance((LATITUDE, LONGITUDE), x[0]).km for x in close_weather]

positions, alts, hums, ps, dirs, speeds, temps = zip(*close_weather)

av_alt = sum(alts) / len(alts)
av_hum = sum(hums) / len(hums)
av_p = sum(ps) / len(ps)
close_dir = dirs[0]
close_speed = speeds[0]
av_temp = sum(temps) / len(temps)

tts_text = f"This is the weather report for your area based on data from nearby aircraft. The average humidity is {av_hum} percent. The average pressure is {av_p} inches of mercury. The average wind direction at the closest source is {direction_words[close_dir]}, and the average wind speed at the closest source is {close_speed} knots. The average temperature (corrected for altitude differences) is {av_temp} degrees Celsius. Please make sure to read the accuracy report to verify these results. Lower numbers often mean more accurate data."

print("Weather report (read by AI)    ")
print("-----------------------------")
print(f"Average humidity: {av_hum}%")
print(f"Average pressure: {av_p}inHg")
print(f"Wind direction (at closest source): {direction_words[close_dir]}")
print(f"Wind speed (at closest source): {close_speed}kt")
print(f"Average temperature (altitude corrected): {av_temp}°C")
print("-----------------------------")
print("Accuracy report")
print("-----------------------------")
print(f"Average altitude: {av_alt}ft")
print(f"Average source distance: {sum(distances) / len(distances)}km")
print(f"Closest source distance: {distances[0]}km")
print("-----------------------------")

player_stream = PyAudio().open(format=paInt16, channels=1, rate=44100, output=True)
with client.audio.speech.with_streaming_response.create(
    model="tts-1",
    voice="alloy",
    input=tts_text,
) as response:
    for chunk in response.iter_bytes(chunk_size=1024):
        player_stream.write(chunk)
player_stream.close()

map = folium.Map(location=[LATITUDE, LONGITUDE])

for i, temp in enumerate(temps):
    folium.Marker(
        location=positions[i],
        popup=f"Temperature: {temp}°C\nHumidity: {hums[i]}%\nPressure: {ps[i]}inHg\nWind direction:{dirs[i]}\nWind speed:{speeds[i]}",
        tooltip=f"Source {i+1}",
    ).add_to(map)

map.save("weather_map.html")

file_path = os.path.join(os.getcwd(), "weather_map.html")
print(f"Map saved to {file_path}")
