
function training(){
    var count = 0

    //10秒後に終了
    setTimeout(finish, 10000);

    //トレーニング中は１秒ごとにcanvas画像をinput file2 に appendしていく
    var snapShot = function(){
        count++
        console.log("snap")
        //スナップ処理

    }

    //繰り返し処理＋finish呼び出し
    var id = setInterval(function(){
        snapShot();
        
        if(count > 9){
            clearInterval(id)
            finish()
        }
    },1000)

    //終了時に送信して結果もらう
    var finish = function(){
        console.log("finish")
    }
}
