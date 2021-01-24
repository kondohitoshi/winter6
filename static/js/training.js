
// 0-3秒笑う、4-6秒真顔、7-10笑う

function training(){
    var count = 0

    //10秒後に終了
    setTimeout(finish, 10000);

    //トレーニング中は１秒ごとにcanvas画像をinput file2 に appendしていく
    var snapShot = function(){
        count++
        console.log("snap")
        //スナップ処理
        canvas = document.getElementById('canvas')
        canvas.toBlob(function(blob) {
            var newImg = document.createElement("img"),
                url = URL.createObjectURL(blob);
          
            newImg.onload = function() {
              // 無効化されたため、もはや blob を読み取る必要はありません。
              URL.revokeObjectURL(url);
            };
          
            newImg.src = url;
            newImg.classList.add("snap-photo")
            //親
            var list = document.getElementById('snap-list')

            var newNode = document.createElement( "li" ) ;
            newNode.classList.add("item")
            newNode.appendChild(newImg)

            list.appendChild(newNode);
          });
    }

    //繰り返し処理＋finish呼び出し
    siji = document.getElementById('mydiv')
    var id = setInterval(function(){
        snapShot();
        if(count<3.1){
            siji.innerHTML = "<p>笑って</p>"
        }else if(count<6.1){
            siji.innerHTML = "<p>笑わないで</p>"
        }else{
            siji.innerHTML = "<p>笑って</p>"
        }
        if(count > 9){
            siji.innerHTML = "<p>計測終了</p>"
            clearInterval(id)
            finish()
        }
    },1000)

    //終了時に送信して結果もらう
    var finish = function(){
        console.log("finish")
    }
}
