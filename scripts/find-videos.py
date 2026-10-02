"""Find a well-regarded YouTube explainer for every article.

Searches YouTube for each article's query, keeps results from a list of
trusted science channels, and picks the best by channel tier, views and
title match. Writes src/data/videos.json as {slug: {id, title, channel}}.
Usage: python3 scripts/find-videos.py  (reads topics from scripts/list-topics.mjs)
"""
import json, math, re, subprocess, sys, time, urllib.parse

TIERS = {
    3: ['Veritasium', 'Kurzgesagt – In a Nutshell', 'minutephysics', 'TED-Ed', '3Blue1Brown', 'PBS Space Time',
        'Steve Mould', 'Physics Girl', 'SmarterEveryDay', 'Vsauce', 'Periodic Videos', 'NileRed', 'Real Engineering',
        'Sabine Hossenfelder', 'Fermilab', 'Be Smart', 'The Royal Institution', 'Tyler DeWitt', 'Crash Course'],
    2: ['SciShow', 'SciShow Space', 'Science ABC', 'FuseSchool - Global Education', 'Khan Academy', 'Professor Dave Explains',
        'Amoeba Sisters', 'Bozeman Science', 'The Action Lab', 'NASA', 'NASA Goddard', 'Domain of Science', 'Up and Atom',
        'Arvin Ash', 'Science Asylum', 'The Science Asylum', 'Cool Worlds', 'Astrum', 'History of the Universe',
        'Primer', 'Branch Education', 'Lesics', 'It\'s Okay To Be Smart', 'Nottingham Science', 'Sixty Symbols',
        'Numberphile', 'Mark Rober', 'Practical Engineering', 'PBS Eons', 'Nature Video', 'National Geographic',
        'BBC Earth', 'BBC Ideas', 'The Organic Chemistry Tutor', 'Free Animated Education', 'Big Think', 'Fun Science',
        'Dr. Becky', 'Looking Glass Universe', 'The Efficient Engineer', 'Animagraffs', 'Jared Owen', 'Crash Course Kids',
        'NOAA SciJinks', 'Met Office - Weather and Climate Change', 'Smithsonian Channel', 'World Science Festival',
        'Physics Explained', 'Ben Eater', 'Nucleus Medical Media', 'Osmosis from Elsevier', 'TED', 'Neil deGrasse Tyson',
        'StarTalk', 'Thoughty2', 'Chemistry by Dr. Andrew', 'MinuteEarth', 'TIME', 'Vox', 'Wendover Productions'],
}
CHANNEL_TIER = {c.lower(): t for t, cs in TIERS.items() for c in cs}

def tier(channel):
    c = (channel or '').strip().lower()
    if c in CHANNEL_TIER:
        return CHANNEL_TIER[c]
    if c.startswith('crash course'):
        return 3
    return 0

def views(text):
    m = re.sub(r'[^0-9]', '', text or '')
    return int(m) if m else 0

def seconds(text):
    parts = [int(x) for x in (text or '0').split(':') if x.isdigit()]
    s = 0
    for p in parts:
        s = s * 60 + p
    return s

def search(q):
    url = 'https://www.youtube.com/results?' + urllib.parse.urlencode({'search_query': q, 'hl': 'en', 'gl': 'US'})
    html = subprocess.check_output(['curl', '-s', '--max-time', '30', '-A', 'Mozilla/5.0', '-H', 'Accept-Language: en-US,en', url]).decode('utf-8', 'replace')
    m = re.search(r'var ytInitialData = (\{.*?\});</script>', html)
    data = json.loads(m.group(1))
    out = []
    def walk(o):
        if isinstance(o, dict):
            v = o.get('videoRenderer')
            if v and 'videoId' in v:
                out.append({
                    'id': v['videoId'],
                    'title': ''.join(r.get('text', '') for r in v.get('title', {}).get('runs', [])),
                    'channel': (v.get('ownerText', {}).get('runs') or [{}])[0].get('text', ''),
                    'views': views(v.get('viewCountText', {}).get('simpleText')),
                    'secs': seconds(v.get('lengthText', {}).get('simpleText')),
                })
            for x in o.values():
                walk(x)
        elif isinstance(o, list):
            for x in o:
                walk(x)
    walk(data)
    return out

STOP = set('the a an of and in to is how what why explained explain does do work works with for on'.split())

def words(s):
    return {w for w in re.findall(r'[a-z0-9]+', s.lower()) if w not in STOP and len(w) > 2}

def pick(results, q):
    qw = words(q)
    best, best_score = None, -1
    for r in results:
        t = tier(r['channel'])
        if t == 0 or not (90 <= r['secs'] <= 45 * 60):
            continue
        overlap = len(qw & words(r['title'])) / max(1, len(qw))
        if overlap == 0:
            continue
        score = t * 3 + math.log10(r['views'] + 10) + overlap * 4
        if score > best_score:
            best, best_score = r, score
    return best

def main():
    topics = json.loads(subprocess.check_output(['node', 'scripts/list-topics.mjs'], stderr=subprocess.DEVNULL))
    try:
        found = json.load(open('src/data/videos.json'))
    except Exception:
        found = {}
    only = set(sys.argv[1:])
    for t in topics:
        if only and t['slug'] not in only:
            continue
        if t['slug'] in found and not only:
            continue
        r = None
        for q in [t['q'], t['q'] + ' veritasium OR kurzgesagt OR ted-ed']:
            try:
                r = pick(search(q), t['q'])
            except Exception as e:
                print('ERR', t['slug'], e, file=sys.stderr)
            if r:
                break
            time.sleep(1)
        if r:
            found[t['slug']] = {'id': r['id'], 'title': r['title'], 'channel': r['channel']}
            print(f"{t['slug']:40} {r['channel'][:22]:22} {r['views']:>11,}  {r['title'][:70]}")
        else:
            print(f"{t['slug']:40} -- none --")
        json.dump(found, open('src/data/videos.json', 'w'), indent=2, ensure_ascii=False)
        time.sleep(0.8)

main()
