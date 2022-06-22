<p align='center'>
  <img src='/public/favicon.svg' alt='wine bottle png' width='50'/>
</p>

<h6 align='center'>
<a href="https://github.com/rogepi/redwine-Identify/">Redwine Identify</a>
</h6>

<h5 align='center'>
<b>基于百度AI开放平台图像识别API的红酒识别小应用</b>
</h5>

<br>

### 在线浏览

[地址](https://redwine-identify.netlify.app/)


### 使用

- 克隆项目

```bash
npx degit rogepi/redwine-Identify my-redwine-app
cd my-redwine-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

- 申请百度AI开放平台access_token

[申请地址](https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu)

- 修改<b>.env</b>文件

```
VITE_ACCESS_TOKEN= '获取到的access_token'
```

- 运行

```
pnpm vite
```

### 关于


使用antfu的[vitesse-lite](https://github.com/antfu/vitesse-lite)模板(vue3、vite、unocss)