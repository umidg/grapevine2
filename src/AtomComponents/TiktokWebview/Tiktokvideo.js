import { Center, View, Text } from 'native-base';
import React, { useRef } from 'react';
import WebView from 'react-native-webview';

const Tiktokvideo = ({ uri, h, w, size, buttonSize }) => {
  console.log(uri);
  const webref = useRef(null);
  const script = `(function(){
    var videoelement = document.querySelectorAll('div.embed-video-container > * > *')[0];
    var removable = document.querySelector('div.embed-video-container > *');
    removable.innerHTML = "";
    removable.appendChild(videoelement);

    var sideElement = document.querySelector("div.css-troimg");
    sideElement.innerHTML = "";

    var border = document.querySelectorAll('div.embed-video-container > div')[0];
    border.style.height = "${size || 200}px";

    var videoSize = document.querySelectorAll('div.embed-video-container > div > div > div > div > div')[0];
    videoSize.style.height = "${size || 200}px";


    

    var username = document.querySelectorAll('div[data-testid="player-profile"]')[0]

    var playButton = document.querySelectorAll('div.cover > span')[0];


    
    playButton.style.height = "${buttonSize || 100}px";
    playButton.style.width = "${buttonSize || 100}px";

  })()`;

  const contentLoaded = () => {
    setTimeout(() => {
      if (webref) webref?.current?.injectJavaScript(script);
    }, 3000);
    return () => {};
  };

  return (
    <View w={w ? w : '100%'} h={h ? h : 200}>
      <WebView
        ref={webref}
        style={{
          height: '100%',
          width: '100%',
        }}
        onLoadEnd={contentLoaded}
        source={{
          uri: uri,
        }}
        onMessage={(message) => console.log(message)}
        javaScriptEnabledAndroid={true}
        useWebView2={true}
        cacheEnabled={false}
        useWebkit={true}
        androidLayerType='hardware'
        // injectedJavaScript={script}
        // injectedJavaScriptBeforeContentLoaded={script}
        scrollEnabled={false}
      />
    </View>
  );
};

export default React.memo(Tiktokvideo);
