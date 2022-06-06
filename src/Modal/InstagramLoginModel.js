import { View, Flex, Pressable, Image } from 'native-base';
import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const qs = require('qs');

const InstagramLoginModel = ({ show, close, loginSuccess }) => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef(null);
  const redirectUrl = 'https://github.com/';
  const appId = '1817113448678856';
  const appSecret = '13e787b8903c5a5b4cc84164a37fee00';
  const uri = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`;

  const fetchAdditionalInfo = async (accessToken) => {
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((post) => {
        fetch(
          `https://graph.facebook.com/v11.0/${post.data[0].id}?fields=caption,comments_count,id,ig_id,is_comment_enabled,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username,video_title&access_token=${accessToken}`
        ).then((data) => data.json());
      })
      .catch((err) => {
        console.log('err', err);
      });
    // fetch the user information, ie username
    fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((d) => {
        // console.log("user_data", d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getToken = async (code) => {
    const res = await axios({
      method: 'post',
      url: 'https://api.instagram.com/oauth/access_token',
      data: qs.stringify({
        client_id: appId,
        client_secret: appSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
        code,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(({ data }) => data)
      .catch((err) => {
        console.log('Error instagram', err);
        return false;
      });
    return res.access_token;
  };

  const changeWebViewstate = async (state) => {
    // get url of the the site that is rendered in webview
    const { url } = state;
    // eslint-disable-next-line max-len
    // only proceed if url is present , url is redirect url and key <1 (because the function run twice for each redirect: twice when instagram login page renders and twice when redirect url renders )
    if (url && url.startsWith(redirectUrl) && key < 1) {
      setKey(key + 1);
      // refactor the url to get the code only
      let code = url.split(`${redirectUrl}?code=`);
      code = code[1];
      code = code.split('#_');
      code = code[0];
      console.log('code', code);
      // now fetch token with code
      const res = await getToken(code);
      if (res) {
        setKey(0);
        fetchAdditionalInfo(res);
        loginSuccess(res);
        close();
      } else {
        setKey(0);
        loginSuccess('Error Occured');
        close();
      }
    } else {
      setKey(0);
    }
  };

  if (!show) {
    return <View />;
  }
  return (
    <Flex
      h='100%'
      w='100%'
      bg='rgba(0,0,0,0.2)'
      justifyContent='center'
      alignItems='center'
      position='absolute'
      top={0}
      left={0}
    >
      <View h='50%' w='80%' bg='#fff'>
        <Flex
          flexDirection='row'
          alignItems='center'
          justifyContent='flex-end'
          borderBottomWidth={1}
          p={5}
        >
          <Pressable onPress={close}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios-glyphs/30/000000/cancel.png',
              }}
              alt='Back icon'
              h='7'
              w='7'
            />
          </Pressable>
        </Flex>
        <WebView
          ref={webViewRef}
          source={{ uri }}
          onNavigationStateChange={changeWebViewstate}
        />
      </View>
    </Flex>
  );
};

export default InstagramLoginModel;
