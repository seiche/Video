Video
=====

Simple repository for online H.264

```
 ffmpeg -i raw/source.avi -s 854x480 -r 42 -vcodec libx264 -coder 0 -bf 0 -flags2 -wpred-dct8x8 -level 13 -maxrate 768k -bufsize 3M -acodec libvorbis -ac 2 -ar 48000 -ab 192k data/output.mp4
```
