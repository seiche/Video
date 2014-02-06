Video
=====

Simple repository for online H.264

**360p**
```
 ffmpeg -i raw/source.avi -s 640x360 -r 42 -vcodec libx264 -coder 0 -bf 0 -flags2 -wpred-dct8x8 -level 13 \
 -maxrate 500k -bufsize 3M -acodec libvorbis -ac 2 -ar 48000 -ab 192k data/360p.mp4
```

**480p**
```
 ffmpeg -i raw/source.avi -s 854x480 -r 42 -vcodec libx264 -coder 0 -bf 0 -flags2 -wpred-dct8x8 -level 13 \
 -maxrate 800k -bufsize 3M -acodec libvorbis -ac 2 -ar 48000 -ab 192k data/480p.mp4
```

**720p**
```
 ffmpeg -i raw/source.avi -s 1280x720 -r 42 -vcodec libx264 -coder 0 -bf 0 -flags2 -wpred-dct8x8 -level 13 \
 -maxrate 1000k -bufsize 3M -acodec libvorbis -ac 2 -ar 48000 -ab 192k data/720p.mp4
```
