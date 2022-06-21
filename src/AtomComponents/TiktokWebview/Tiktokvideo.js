import { Center, View, Text } from 'native-base';
import React, { useRef } from 'react';
import WebView from 'react-native-webview';

const Tiktokvideo = ({ uri, h, w }) => {
  const webref = useRef(null);
  const script = `(function(){
    var videoelement = document.querySelectorAll('div.embed-video-container > * > *')[0];
    var removable = document.querySelector('div.embed-video-container > *');
    removable.innerHTML = "";
    removable.appendChild(videoelement);

    var border = document.querySelectorAll('div.embed-video-container > div')[0];
    border.style.height = "200px";

    var videoSize = document.querySelectorAll('div.embed-video-container > div > div > div > div > div')[0];
    videoSize.style.height = "200px";
  })()`;

  const contentLoaded = () => {
    console.log('content Loaded');

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
        // javaScriptEnabledAndroid={true}
        // injectedJavaScript={script}
        // injectedJavaScriptBeforeContentLoaded={script}
      />
    </View>
  );
};

export default React.memo(Tiktokvideo);
