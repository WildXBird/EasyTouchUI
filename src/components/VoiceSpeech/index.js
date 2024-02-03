

export const Speech = (textToSpeak, onEndCallback, onStartCallback) => {
    if (!window.speechSynthesis) {
        alert('您的浏览器不支持语音合成功能！');
        return;
    }
    console.debug("Speech", textToSpeak)
    window.speechSynthesis.cancel();
    
  setTimeout(() => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = textToSpeak;
    msg.lang = 'zh-CN';
    msg.rate = 0.5;
    msg.pitch = 1.0;
    msg.volume = 1.0;
    msg.onstart = onStartCallback
    msg.onend = onEndCallback
    window.speechSynthesis.speak(msg);

  }, 200);
}
Speech.cancel = () => {
    window.speechSynthesis.cancel();
}