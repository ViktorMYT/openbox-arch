!function(e){function t(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return e[s].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),n=function(){function e(){i(this,e),this.initialized=!1,this.mounted=!0,this.appWindow=null,this.appOrigin=null,this.volume=100,this.playing=!1,this.playingOpts=null,this.onPlayerError=this.onPlayerError.bind(this),this.createPlayer=this.createPlayer.bind(this),this.getCurrentTime=this.getCurrentTime.bind(this),this.loadVideo=this.loadVideo.bind(this),this.pollReady=this.pollReady.bind(this),this.onPlayerReady=this.onPlayerReady.bind(this),this.onPlayerStateChange=this.onPlayerStateChange.bind(this),this.onPlayerError=this.onPlayerError.bind(this),this.onMessage=this.onMessage.bind(this),this.sendMessage=this.sendMessage.bind(this),this.parseMessage=this.parseMessage.bind(this),this.onVideoEnd=this.onVideoEnd.bind(this),this.setPlaying=this.setPlaying.bind(this),this.setVolume=this.setVolume.bind(this),window.addEventListener("message",this.onMessage),this.setUp()}return s(e,[{key:"setUp",value:function(){return void 0==window.YT.Player?void setTimeout(this.createPlayer,500):void this.createPlayer()}},{key:"onMessage",value:function(e){null!=this.appWindow&&null!=this.appOrigin||(this.appWindow=e.source,this.appOrigin=e.origin),this.parseMessage(e.data)}},{key:"sendMessage",value:function(e){this.appWindow&&this.appOrigin?this.appWindow.postMessage(e,this.appOrigin):console.log("need access to app")}},{key:"createPlayer",value:function(){this.player=new window.YT.Player("player",{width:"100%",height:"100%",playerVars:{autoplay:1,controls:0,rel:0},events:{onReady:this.onPlayerReady,onStateChange:this.onPlayerStateChange,onError:this.onPlayerError}})}},{key:"componentWillUnmount",value:function(){this.mounted=!1,this.player&&this.player.destroy()}},{key:"removeAddsAndButtons",value:function(){}},{key:"parseMessage",value:function(e){void 0!=this.player&&(null!=e.volume&&this.setVolume(e.volume),null!=e.seekToPosition&&this.player.seekTo(e.seekToPosition*this.player.getDuration()),null!=e.playingOpts&&(console.log("player options"),this.volume=e.playingOpts.volume,this.playingOpts=e.playingOpts,this.loadVideo(),this.initialized=!1),null!=e.playing&&(e.playing?this.player.playVideo():this.player.pauseVideo()),null!=e.fullscreen&&document.getElementById("player").webkitRequestFullscreen())}},{key:"removeAdds",value:function(){MutationObserver=window.MutationObserver||window.WebKitMutationObserver;var e=new MutationObserver(function(e,t){for(var i=0;i<e.length;++i)for(var s=0;s<e[i].addedNodes.length;++s){var n=e[i].addedNodes[s];if(n.classList.contains("video-ads"))return void console.log("adds added to video")}});e.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0})}},{key:"loadVideo",value:function(){if(!this.player||!this.player.loadVideoById)return void this.pollReady();var e={videoId:this.playingOpts.src};null!=this.playingOpts.startTime&&(e.startSeconds=this.playingOpts.startTime),null!=this.playingOpts.endTime&&(e.endSeconds=this.playingOpts.endTime),this.player.loadVideoById(e),this.setVolume(),setTimeout(this.getCurrentTime,500),setTimeout(this.removeAddsAndButtons,500)}},{key:"setVolume",value:function(e){void 0!=e&&(this.volume=e),this.player.setVolume(this.volume)}},{key:"getCurrentTime",value:function(){this.playing&&this.sendMessage({currentTime:this.player.getCurrentTime(),duration:this.player.getDuration()}),this.mounted&&setTimeout(this.getCurrentTime,250)}},{key:"onPlayerReady",value:function(e){console.log("ready")}},{key:"onPlayerError",value:function(e){console.log("error:"+e),setTimeout(this.onVideoEnd,1e3)}},{key:"onVideoEnd",value:function(){this.sendMessage({ended:!0})}},{key:"setPlaying",value:function(e){this.playing=e,this.sendMessage({playing:e})}},{key:"pollReady",value:function(){return this.player&&this.player.loadVideoById?void this.loadVideo():void setTimeout(this.pollReady,5)}},{key:"onPlayerStateChange",value:function(e){switch(e.data){case window.YT.PlayerState.ENDED:this.onVideoEnd();break;case window.YT.PlayerState.PLAYING:this.setPlaying(!0),this.initialized||(console.log(this.player.getDuration()),this.sendMessage({initialDuration:this.player.getDuration()}),this.setVolume(),this.player.hideVideoInfo(),this.initialized=!0);break;case window.YT.PlayerState.PAUSED:this.setPlaying(!1);break;default:return}}},{key:"resetPlayer",value:function(){}}]),e}();n.displayName="ChromeWatch.YoutubePlayer",new n}]);