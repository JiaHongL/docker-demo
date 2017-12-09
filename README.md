## ㄧ、前提
&emsp;這是一個學習Docker的筆記，內容是試著將開發環境移到Docker上運行。

<br />

## 二、Docker簡介
&emsp;Docker是一種輕量化的虛擬技術，只專注於系統的應用程式執行，並不像傳統VM必須先安裝完整的作業系統(Guest OS)，才能開始安裝或相關應用的執行，所以Docker所需的image(映像檔)也是非常小，而Docker的image也可以包含的套件安裝執行，如安裝一個已帶有Npm與Git的linux環境，另外傳統VM是會獨佔所配置的資源(CPU、記憶體)，而Docker所建立的Container是與主機共享資源，不過Container建立的環境是單獨隔離的，並不會互相影響。

**優點整理**

- 秒級啟動
- 有效運用系統資源
- 可自訂系統環境安裝與修改管理
- 容易部署與遷移系統
- 易跨平台的虛擬運行(只需安裝好Docker)

<br />

## 三、前置作業

1. 照著官網文件，完成安裝Docker。
![](https://1.bp.blogspot.com/-CqVt49A2HfU/WitwH4MRYqI/AAAAAAAAA1s/W3PoMpfiyA0LxAO0_H5TVKTR_Z54R0b7ACLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-08%2B%25E4%25B8%258B%25E5%258D%25881.16.10.png)

2. 創一個 Docker Hub 帳號，並使用終端機輸入 docker login，登入帳號。
![](https://4.bp.blogspot.com/-dVAaisBEOjk/Witx1Um7t0I/AAAAAAAAA14/MV7NPuOZXOgzCqVLTjmpZ2cD2ptwycyjACLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25881.16.47.png)

<br />

## 四、基礎介紹
### 名詞
- **Image** : 如同系統的映像檔一樣，可使用它來建立需要環境。
- **Container** : 安裝image與運行系統的容器，而容器之間都是隔離的。
- **Docker Hub** : 如同GitHub一樣，是個公開的docker庫，使用者可以pull別人的image下來，或push自己的image提供給別人收尋與使用，如果是自家使用的image，也可以自建私有的Docker Registry.

<br />

### 指令

#### Image
1. Search:收尋一個14.04版本的ubuntu。
```
docker search ubuntu:14.04
```
```
NAME：image名稱
DESCRIPTION：images敘述
STARS：stars數量
OFFICIAL：是否為官方提供的image
AUTOMATED：是否有自動build，自己上傳的image設定連動，如Github commit後，就會自動build image 與 commit 到 Docker Hub.
```
![](https://1.bp.blogspot.com/-6QU6z0TAscE/Wit-JicYwSI/AAAAAAAAA2I/2C2hJHz3mZI3pkR4sU8uHu0W26FJQM_CgCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25882.09.09.png)

2. pull:取得影像檔案。
```
docker pull ubuntu:14.04
```
![](https://2.bp.blogspot.com/-OSQK2T9jLpI/WiuDvCdhm6I/AAAAAAAAA2Y/uyIdxPB-WaQ1Uw_iiVXwGY0BupNv2RvbQCLcBGAs/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25882.32.25.png)

3. images:查看已下載image的資訊。
```
docker images
```
![](https://4.bp.blogspot.com/-65bWx9LZgqQ/WiuFFPKeh2I/AAAAAAAAA2k/gH_rHkJA4CIiN8XNZ0niCM__qH5bzhfbQCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25882.37.58.png)

4. rmi:刪除已下載的image。
```
docker rmi IMAGE
```
![](https://1.bp.blogspot.com/-B9NyIEVFXj8/WiuGsrAOsvI/AAAAAAAAA2w/KUMnxVHOv8svpkkS3Fxu1kvNZ1Tjk244gCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25882.45.48.png)

如果不知道或忘記指令參數，可以到官網查看，或是指令後面打--help
```
docker rmi --help

-f：強制刪除image.
docker rmi -f image
```
![](https://3.bp.blogspot.com/-YqQYDo-upo8/WiuIToMVYXI/AAAAAAAAA28/fJ9-OlukrR47hO8a9WY5g1xvJFg1uB1QACLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25882.50.25.png)

<br />

#### Container

1. 建立一個容器
```
docker run -t -i --name my-ubuntu ubuntu:14.04 /bin/bash

-t：容器的終端機.
-i：讓鍵盤可以輸入到虛擬機的終端機.
--name：為容器命名.

ubuntu:14.04 => 安裝ubuntu版本為14.04，會抓本地端的image，如果沒有就會從Docker hub Search 與 pull 回來，再進行安裝。
/bin/bash => 進入容器所建立ubuntu的Shell，就可以在裡面打指令(虛擬機的ubuntu).

```
![](https://lh3.googleusercontent.com/-jnTZI3LCkYE/WiuOKBfOSWI/AAAAAAAAA3M/pKvs5r9tleUOOQ7YqyEihEQlcdmz8O6ngCLcBGAs/h160/1.png) 

2. 查看已建立容器的資訊

```
docker ps -a

-a：顯示全部的容器，包含運行與停止的.
```

![](https://4.bp.blogspot.com/-fQAdFBlQPlc/WiuRtc1PP7I/AAAAAAAAA3Y/Lkces7gZTA0kQlA6OGoh0aeSF3tyu5rQwCLcBGAs/s640/2.png)

3. 離開容器

```
exit

ps: 就會從容器的root帳號離開，回到本機的帳號.
```
![](https://1.bp.blogspot.com/-gcNi1Z33GDU/WiuSWIpZmPI/AAAAAAAAA3g/EMYiSbu-aycCdhN1FPIb0OalKvzzt93zQCLcBGAs/s640/3.png)

```
docker ps -a

再打一次指令查看，就會看到這容器現在停止狀態.
```
![](https://3.bp.blogspot.com/-UW6zXbYT1_0/WiuS-d767MI/AAAAAAAAA3s/g8nCRkHqBkIiFXjm_bqZYh2zaU1fkuS6gCLcBGAs/s640/4.png)

4. 建立一個使用後就會自己移除的容器
```
docker run --rm -ti ubuntu:14.04 /bin/bash
--rm:使用後移除容器

當離開再查看，就只會看到第一次建立的那個my-ubuntu容器.
```
![](https://4.bp.blogspot.com/-kLBf8PopVAU/WiuZbB8eenI/AAAAAAAAA4U/yu70fZFwGpkfO6T9FhbffUnNaXwKpLMGQCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25884.04.36.png)

5. 重啟容器

```
docker start CONTAINER

ps:再查看就會看到已啟動.
```
![](https://3.bp.blogspot.com/-xesR6ubccq8/WiuUZirL0xI/AAAAAAAAA34/LdMWVQWTnXAI8dXnMBFL3NOQMckjZIZzwCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25883.44.07.png)

6. 進入容器
```
docker attach CONTAINER
```
![](https://3.bp.blogspot.com/-5LNzHmmhnhU/WiuV7nBst5I/AAAAAAAAA4E/nfj7Gkq2VO4JdzskKe6yVHHzs2IPNnaswCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25883.50.30.png)

7. 停止容器
```
docker stop CONTAINER

docker kill CONTAINER

差異：stop會做像是關機的動作，而kill是直接關掉容器.
```
![](https://1.bp.blogspot.com/-HhmPNxV9FjE/Wiu1KpOFB9I/AAAAAAAAA5k/jw7G9InZBD8q6cceQMRLFd2ToDMN4VL8wCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25886.03.48.png)

<br />

## 五、Dockerfile
&emsp;自己撰寫設定來自製一個image。

<br />

1. 撰寫一個設定檔案.

![](https://1.bp.blogspot.com/-mc2l09afRKY/WiuisdpXuyI/AAAAAAAAA4k/0_lXWPUo15kHTsOEQQL3x7P8-UhKy2MewCLcBGAs/s640/123.png)

說明：一個以ubuntu 14.04 為基底，另外包安裝node 7.x版本 與 全域 gulp 3.9.1 版本.

2. build image
```
docker build ./docker --tag="joe/front-end:1.0"

--tag：設定image的資訊

因為設定檔是放在docker資料夾下，另外如果沒有指定檔案的話，就會預設去找檔名為Dockerfile來build。

```
![](https://4.bp.blogspot.com/-4_tgZkQVMGQ/WiumApfndUI/AAAAAAAAA40/sVByIgE5XnknGubjlRYnwLMhkR6FBdOFwCLcBGAs/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25884.57.02.png)

build成功後，再查images就會看到自製image已經完成.
![](https://2.bp.blogspot.com/-9MrKIh6U8Lk/WiumAkTQkOI/AAAAAAAAA4w/x_hxod0M7xMaSKlmMMjHFddAEtM4Q1OXQCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25884.59.22.png)


3. 利用自製的images運行一個一次性容器，然後使用容器的環境來進行專案套件的安裝.

目前本機上是沒有安裝node和npm的
![](https://4.bp.blogspot.com/-7z_5_9Br8DA/WiupCiEPPeI/AAAAAAAAA5A/rPK2r6w8MAU8PvABgRYnrrS1c41nSGpAQCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25885.12.05.png)

```
docker run --rm -ti -v ~/Desktop/docker-demo/app:/app joe/front-end:1.0

--rm:使用後刪除容器
--ti:使用容器的終端機與鍵盤
-v: 設定本機的docker-demo下的app資料夾掛載進去虛擬機的app資料夾.

＝>進入後使用 npm install 安裝套件，安裝完後打exit出來，容器使用完後就移除.

PS:因為Dockerfile有設定進入容器後自動切換到虛擬機的app資料夾，所以也可以直接在把要打的npm指令寫在後面，容器就會安裝然後自己exit.(指令如下)

docker run --rm -t -v ~/Desktop/docker-demo/app:/app joe/front-end:1.0 npm install
```
![](https://3.bp.blogspot.com/-a2_JpFbizEc/Wius6WJ74GI/AAAAAAAAA5M/w74UYyXdtA8t9Fuxm8jDXa2Zm3rwEkoqACLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25885.28.39.png)

就可以看到利用了容器的環境安裝了專業所需的套件.
![](https://2.bp.blogspot.com/-AabCNnWdwn4/WiuxB3rrSWI/AAAAAAAAA5Y/YxPSV6_c30sYd08l53a8odYBoDc_G2HXgCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25885.45.00.png)

4. 利用容器跑專案的開發環境

```
docker run --rm -ti -p 0.0.0.0:3000:3000 -p 0.0.0.0:35729:35729 -v "$PWD":/app joe/front-end:1.0 

-p:設定主機與虛擬機的對接port.
"$PWD":本機目前資料夾路徑.

=> 進入後打gulp就可以跑起專案了.

```

![](https://4.bp.blogspot.com/-8SzFTCokfdI/Wiu57Wo9IaI/AAAAAAAAA5w/K2Zmlg7TC3g586NP_4kkyKZSIQhBsBcwQCLcBGAs/s640/1.png)

在本機修改scss後，由虛擬機做compile.
![](https://4.bp.blogspot.com/-vGtiNWY7hgM/Wiu57XnuNmI/AAAAAAAAA50/TEPSFq_xs90UM-CDIUGQ9VGCa33LUx9JwCLcBGAs/s640/2.png)

<br />

## 六、Docker Compose
&emsp;剛剛利用了Dockerfile製作了自己的image，但如果每次要用時都要設定port和資料掛載的路徑就很麻煩了，另外也可能一次要run很多個容器起來，如先run後端容器，然後再run前端容器，所以就可以利用docker-compose來做設定與跑容器.

![](https://1.bp.blogspot.com/-3gBhK-TFdf4/Wiu-dZGEO2I/AAAAAAAAA6A/_K2L3oOoQ2kRWUOCqZdvUNx5F-UA47oxQCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25886.43.18.png)
>dcoker-compose除非是安裝時有自帶，不然是要另外安裝的.


1. 建立與設定 docker-compose.yml 檔案

![](https://3.bp.blogspot.com/-OEkAlGOl1-M/WivCS9ZaTqI/AAAAAAAAA6M/vNxc2Mi2CUoWJ0OfeQOTSsp2ZVih5lbxwCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25886.45.49.png)

2. 一次建立全部的image
```
docker-compose build .
```

![](https://4.bp.blogspot.com/-V1RtW9ScV_k/WivEWjGJq8I/AAAAAAAAA6c/-0yl6I5I-NYZzGMqmSJw-tsheE43489TACLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25887.07.04.png)

跑完後再查看就會看到建立了兩個設定的image

![](https://3.bp.blogspot.com/-WdB_WKD4kIc/WivEWhjzFlI/AAAAAAAAA6Y/BNDKq_a59vIbCCPm5z4Px3g1iHT6TIfEACLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25887.07.27.png)

3. 利用docker-compose跑起一個容器，幫後端專案安裝套件.
```
docker-compose run --rm --entrypoint /bin/bash api

--rm:使用完後移除容器
--entrypoint:覆蓋原本容器啟動後會跑的指令.

```

![](https://2.bp.blogspot.com/-uNcpGsiBY0o/WivIJZAnqeI/AAAAAAAAA6o/cIkNAjJbq6M7GFUeaDHqFT8gjI3au1zCgCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25887.16.28.png)

4. 利用docker-compose跑起一個前端容器做測試.
```
docker-compose run --rm --no-deps --service-ports --entrypoint /bin/bash web

--no-deps:設定不啟動相依的後端容器.
--service-ports:docker-compose run 是預設不對接port的，所以要加這選項，把port對接起來.
```
![](https://1.bp.blogspot.com/-tt--JgheCUQ/WivKqK6QU7I/AAAAAAAAA60/UGwIhUeq_BACmkZmoTTHJI_kgD3r6DuPQCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25887.32.23.png)

5. 利用docker-compose一次跑起前端與後端的開發環境容器.

```
docker-compose up

=> 會看到先跑起api-dev後，才會在跑起web-dev，然後按getData就可以呼叫api取得資料.
```
![](https://1.bp.blogspot.com/-sB4_gtmGc70/WivO7bDMpPI/AAAAAAAAA7A/m05dvmXTMNsPnUZYQDL8YrOEba_YcnbQgCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25887.53.41.png)

修改前端的scss.

![](https://4.bp.blogspot.com/-JZukqraEa5w/WivSWypImWI/AAAAAAAAA7Q/I2Xu9ETI5O4OLpaWj8BwQCmXQVFWO8iKACLcBGAs/s640/1%2B%25E4%25B8%258B%25E5%258D%25886.43.40.png)

修改後端api的response.

![](https://4.bp.blogspot.com/-svVnOA2vE4k/WivSEyfiwOI/AAAAAAAAA7M/-eRFBINSqPgwtCZ6Dne82rzBPpEHc4ciwCLcBGAs/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-12-09%2B%25E4%25B8%258B%25E5%258D%25888.07.06.png)

<br />

操作影片

[![Everything Is AWESOME](https://img.youtube.com/vi/D0zUSymRJAw/0.jpg)](https://youtu.be/D0zUSymRJAw)

<br />

## 七、心得
&emsp;雖然對於前端來說，會安裝到的環境套件並不多，可能在新電腦只要裝個node，就可以再把專案run起來，或是遇到node版本問題，再安裝個nvm做切換版本，就能解決問題，但前端用docker把開發環境與測試環境放進docker做管理也是不錯，而對後端可能安裝到的環境套件就非常多，像是PHP Laveral 就要安裝一大多東西，如 mysql、php、laveral、...等很多套件，或許有時只是學習一個新語言，之後移除的時候，可能就會移除不乾淨，就會把環境弄髒了，其實對後端來說，docker是可以做到更多事，但筆者是個前端沒能理解太多。 

<br />

> 以上文章為筆記，擔心有遺漏之處，如有錯誤觀念或建言，歡迎在[issues](https://github.com/JiaHongL/docker-demo/issues) 提出，感謝.