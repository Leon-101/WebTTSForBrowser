# WebTTSForBrowser

## 功能描述
* 此脚本运行后会创建名为 WebTTS 的全局构造器，需实例化后使用；
* 语音配置支持读取与保存，创建对象时进行读取，网页离开时进行保存；
* 读取与保存途径可传入回调函数自定义，默认保存在当前网页的 localStorage，其他保存途径如 cookin、服务器等，
* 语音参数支持热键控制，可控制项包括 语速、音量、音调的大小，语音的角色；
* 语音参数的控制热键可在创建对象后调用方法进行绑定或移除，默认未绑定；

## 用法
```
let tts = new WebTTS();
tts.speak("Hello world!");  //朗读传入的文本，会打断进行中的朗读
tts.speak("I'm JavaScript.", true);  //排队朗读传入的文本，不会打断进行中的朗读
tts.stop();  //停止朗读
tts.addHotkey();  //添加控制语音参数的热键
tts.removeHotkey();  //移除控制语音参数的热键
```
**以上为简单演示，详细用法及效果可参见项目的 demo**

## WebTTS 的实例化
构造器原型：WebTTS(readConfig = readConfigByDefault, writeConfig = writeConfigByDefault) 
* readConfig {function} <br>
读取配置的回调函数，在创建对象时被调用。调用时传入一个参数，为 WebTTS 构造的对象本身；
* writeConfig {function} <br>
保存配置的回调函数，在 unload 事件出发时被调用，调用时传入的参数同上；

## WebTTS的对象结构
### 对象属性
* rate {number} <br>
用来读取或设置语速，取值范围 1 - 100，默认值 50
* pitch {number} <br>
用来读取或设置语调，取值范围 0 - 100，默认值 50
* volume {number} <br>
用来读取或设置音量，取值范围 0 - 100，默认值 100
* voiceList {Array} <br>
语音列表，存储需要使用的语音，可修改
* voiceName {string} <br>
读取或设置当前使用的语音名称
* utter {object} <br>
由 SpeechSynthesisUtterance 创建的对象
* utterController {object} <br>
在调用 ttx.addHotkey() 后创建的对象，用于控制语音参数

### 对象方法
* speak(text, isWait = false) <br>
text: 需要朗读的文本
isWait: 是否等待当前朗读结束，true 代表等待，false 代表不等待，默认为 false
* stop() <br>
停止朗读（会清空朗读队列）
* addHotkey() <br>
添加热键，用于调节语音参数，默认热键为 shift + F1 ~ F4
* removeHotkey() <br>
移除添加的热键
* filterVoiceList(oldList) <br>
过滤语音列表，在语音列表更新时回调调用。可重写此方法进行自定义过滤，方法需接收一个旧的列表，返回过滤后的列表。