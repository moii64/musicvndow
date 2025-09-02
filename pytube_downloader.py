#!/usr/bin/env python3
import pytube
import os
import sys

def download_audio(url, output_path):
    try:
        print(f"Downloading: {url}")
        yt = pytube.YouTube(url)
        audio = yt.streams.filter(only_audio=True).first()
        
        if audio:
            filename = audio.download(output_path=output_path)
            # Rename to .mp3
            base, ext = os.path.splitext(filename)
            new_file = base + '.mp3'
            os.rename(filename, new_file)
            print(f"Downloaded: {new_file}")
            return True
        else:
            print("No audio stream found")
            return False
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python pytube_downloader.py <url> <output_path>")
        sys.exit(1)
    
    url = sys.argv[1]
    output_path = sys.argv[2]
    
    success = download_audio(url, output_path)
    sys.exit(0 if success else 1)
