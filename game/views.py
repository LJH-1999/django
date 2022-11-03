from django.http import HttpResponse
def index(request):
    line1 = '<h1 style="text-align: center" >欢迎来到刘佳豪的网页</h1>'
    line2 = '<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F19%2F20200119125543_ujluu.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669704204&t=c2f32d73ade5a59051a8987af8cb7bed" width=2000>'
    line3 = '<hr>'
    line4 = '<a href="/play/">进入游戏界面</a>'
    return HttpResponse(line1 + line4 + line3 + line2)

def play(request):
    line1 = '<h1 style="text-align: center" >游戏界面</h1>'
    line2 = '<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201907%2F07%2F20190707203623_hkcon.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669711525&t=d15e12b9043bc4f4a1dfd0993be432d4" width=1600>'
    line3 = '<hr>'
    line4 = '<a href="/">返回菜单界面</a>'
    return HttpResponse(line1 + line4 + line3 + line2)
