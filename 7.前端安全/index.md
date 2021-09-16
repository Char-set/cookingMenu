# 前端安全

## 那些前端安全知识？有哪些名词？

浏览器相关：

1. XSS
2. CSRF
3. HTTPS
4. CSP （内容安全策略，可以禁止加载外域的代码，禁止外域的提交）
5. HSTS (强制客户端使用HTTPS与服务端建立链接)
6. X-Frame-Options (控制当前页面是否可以被嵌入iframe中)
7. SRI (subresource intergrity 子资源的完整性)
    1. index.html中的 index.js 文件存放在cdn上
    2. 用户在请求的时候，根据index.js去氢气，而这个文件可能被篡改
    3. 打包的时候根据js文件内容生成一个hash值，并把这个hash值作为intergrity属性注入到script上
8. Referer-Policy (控制referer的携带策略)


Node(服务端)相关的：

1. 本地文件操作相关，路径拼接导致文件泄漏
2. ReDos 正则表达式
3. 时序攻击
4. ip origin referrer request headers


## 能稍微详情的聊一下xss吗？

1. 概念
2. 攻击类型
3. 如何防范
4. 自己工作中是否遇到？如何解决的？

Cross-site scripting，XSS

攻击者想尽一切办法把可执行的恶意代码注入到网页中

### 外在表现上，都有哪些攻击场景？

1. 评论区植入js代码(可输入的地方)
2. url 上拼接js代码

### 技术角度上，有哪些类型的XSS的攻击？

1. 存储型 Server

论坛发帖，商品评价，用户私信等等这些用户保存数据的网站。

攻击步骤：
* 攻击者将恶意代码提交到目标网站的数据库中
* 用户代码目标网站的时候，服务端将恶意代码从数据库中取出，拼接到html返回给浏览器。
* 用户浏览器收到html后，混在其中的恶意代码就会被执行
* 窃取用户数据，发送到攻击者网站

2. 反射型 server

攻击者结合各种手段，诱导用户点击恶意url。

通过URL传参数的功能，比如网站的搜索或者跳转等。

攻击步骤：

* 攻击者构造出自己恶意的url
* 直接执行可执行的恶意代码

3. Dom型 Browser

取出和秩序恶意代码的操作，由浏览器完成

攻击步骤：

    url参数

### 如何方案XSS攻击

主旨：防止攻击者提交恶意代码，防止浏览器执行恶意代码

1. 对数据进行严格的输入编码，比如html元素，js，css，url

2. CSP COntent Security Policy （X-XSS-ProtectX-XSS-Protection）

default-src 'self' 所有加载的内容必须来自站点同一个源

3. 输入验证 
4. 开始浏览器的XSS防御：Http Only Cookie
5. 验证码

## 文件操作相关

路径拼接，导致不该被访问的文件被访问到了

设置根路径，校验路径合法性 利用第三方包 resolve-path

## 能稍微详细的聊一下CSRF吗？

Cross-size request forgery，跨站请求伪造

### 攻击步骤

1. 受害者登陆 a.com，并且保留了登陆凭证 cookie
2. 攻击者诱导受害者 访问了 b.com
3. b.com 向 a.com 发送请求 a.com/xxxx，浏览器就会直接带上a.com的cookie
4. a.com收到请求了，执行了对应的操作
5. 攻击者在受害者不知情的情况下，冒充受害者让a.com执行了自己定义的操作

### 攻击类型

* GET 类型：在页面中的img发起一个get请求

`<img src="xxxxxxxxx" />`

* Post 类型：自动提交表单到恶意网站

* 诱导用户点击链接

### 如何防范CSRF攻击

CSRF一半都是发生在第三方域名，攻击者无法获取到cookie信息的。

#### 阻止第三方域名访问

1. 同源检测

request header origin referer

Referer-Policy

2. Cookie SameSite

Strict: 完全禁用第三方cookie
Lax: Post img iframe 不会携带cookie

#### 提交请求的时候附加额外信息

1. CSRF Token

* 用户打开页面的时候，服务器利用加密算法生成一个token
* 每次页面加载的时候，前端吧获取到token，加请求的header上
* 每次js发起请求，也都携带token
* 服务器每次接受请求时，就校验token的有效性

2. 双重Cookie

* 用户在访问网站的时候，服务器向浏览器注入一个额外的cookie
* 每次前端发起请求，都拼上一个参数 a
* 服务器校验参数a是否正确

