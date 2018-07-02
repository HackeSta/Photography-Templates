import urllib3.request, urllib.request
import requests as req
import os
import json
import feedparser
import datetime

def fpx_photographs():
    # userid = '8734325'
    # url = "https://api.500px.com/v1/photos?feature=user&user_id=%s&page=1&image_size[]=3&image_size[]=6&rpp=100&consumer_key=" + os.environ.get('FHPX_CON_KEY')
    # response = req.get(url % userid)
    # print(response.text,file=open('data/fpx_photographs.json','w'))
    url = "https://500px.com/search.rss?q=haideralipunjabi&page=%s"
    page = 1
    photos = []
    more_photos = True
    while(more_photos):
        feed = feedparser.parse(url % page)
        if(feed.entries.__len__() < 20):
            more_photos = False
        else:
            page += 1
        for entry in feed.entries:
            photo = {}
            photo['title'] = entry.title
            photo['link'] = entry.link
            photo['url'] = entry.media_content[0]['url']
            photo['thumbnail'] = entry.media_thumbnail[0]['url']
            photo['published'] = entry.published
            photos.append(photo)
    photos.sort(key=lambda item:datetime.datetime.strptime(item['published'], "%a, %d %b %Y %H:%M:%S %z"), reverse=True)
    jsonData = json.dumps(photos)
    print(jsonData,file=open('data/fpx_photographs.json','w'))
def fpx_user():
    userid = '8734325'
    url ="https://api.500px.com/v1/users/%s/?consumer_key=" + os.environ.get('FHPX_CON_KEY')
    response = req.get(url % userid)
    print(response.text, file=open('data/fpx_user.json','w'))



fpx_photographs()
# fpx_user()
