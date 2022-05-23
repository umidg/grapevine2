import { Center, View } from "native-base";
import React from "react";
import WebView from "react-native-webview";

const Tiktokvideo = ({ uri, h, w }) => {
  const script = `var value = document.getElementsByClassName('_embed_player_video-wrapper')[0];
     value.style.height='100%';
     value.style.width='auto';
     document.body.innerHTML='';
     document.body.appendChild(value);`;

  return (
    <View w={w ? w : "100%"} h={h ? h : 200}>
      <WebView
        style={{
          height: "100%",
          width: "100%",
        }}
        source={{
          uri: uri,
        }}
        javaScriptEnabledAndroid={true}
        injectedJavaScript={script}
        injectedJavaScriptBeforeContentLoaded={script}
      />
    </View>
  );
};

export default Tiktokvideo;
