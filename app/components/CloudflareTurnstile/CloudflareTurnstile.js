import WebView from 'react-native-webview';
import Modal from 'react-native-modal';

function CloudflareTurnstile({successFn, show, setIsShow}) {
  const handleMessage = async event => {
    const token = event.nativeEvent.data;
    await successFn(token);
    setIsShow(false);
  };

  return (
    <Modal isVisible={show} animationIn="fadeIn" animationOut="fadeOut">
      {show && (
        <WebView
          originWhitelist={['*']}
          onMessage={handleMessage}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          source={{
            baseUrl: 'https://heradigitalhealth.org',
            html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      html{
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height: 100%;
                        background-color: transparent;
                      }
                    </style>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                   <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=_turnstileCb" async defer></script>
                  </head>
                  <body>
                     <div id="myWidget"></div>
                     <script>
                        function _turnstileCb() {
                            turnstile.render('#myWidget', {
                              sitekey: '0x4AAAAAAAEbua8l78aE817C',
                              callback: (token) => {
                                window.ReactNativeWebView.postMessage(token);
                              },
                            });
                        }
                     </script>
                  </body>
                </html>
            `,
          }}
        />
      )}
    </Modal>
  );
}

export default CloudflareTurnstile;
