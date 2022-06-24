import { Center, View, Text } from 'native-base';
import React, { useRef } from 'react';
import WebView from 'react-native-webview';

const Tiktokvideo = ({ uri, h, w, size }) => {
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
  })()`;

  const contentLoaded = () => {
    webref.current.injectJavaScript(script);
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
        injectedJavaScript={script}
        injectedJavaScriptBeforeContentLoaded={script}
        scrollEnabled={false}
      />
    </View>
  );
};

export default React.memo(Tiktokvideo);
