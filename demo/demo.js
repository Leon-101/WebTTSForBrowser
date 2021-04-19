debugger;
let tts = new WebTTS();

let text = document.getElementById("text");
let speakBtn = document.getElementById("speakBtn")
let waitSpeakBtn = document.getElementById("waitSpeakBtn");
let stopBtn = document.getElementById("stopBtn");
let addHotkeyBtn = document.getElementById("addHotkeyBtn");
let removeHotkeyBtn = document.getElementById("removeHotkeyBtn");

text.value = "这是一个测试。\nThis is a test.";
speakBtn.addEventListener("click", function () {
	tts.speak(text.value);   //朗读传入的文本，会打断进行中的朗读
});
waitSpeakBtn.addEventListener("click", function () {
	tts.speak(text.value, true);  //排队朗读传入的文本，不会打断进行中的朗读
});
stopBtn.addEventListener("click", function () {
	tts.stop();
});
addHotkeyBtn.addEventListener("click", function () {
	tts.addHotkey();  //添加控制语音参数的热键
});
removeHotkeyBtn.addEventListener("click", function () {
	tts.removeHotkey();  //移除控制语音参数的热键
});


let voiceSelect = document.getElementById("voiceSelect");
let rateSlider = document.getElementById("rateSlider");
let pitchSlider = document.getElementById("pitchSlider");
let volumeSlider = document.getElementById("volumeSlider");

rateSlider.value = tts.rate;
pitchSlider.value = tts.pitch;
volumeSlider.value = tts.volume;

rateSlider.addEventListener("change", function () {
	tts.rate = +rateSlider.value;
});
pitchSlider.addEventListener("change", function () {
	tts.pitch = +pitchSlider.value;
});
volumeSlider.addEventListener("change", function () {
	tts.volume = +volumeSlider.value;
});

loadVoiceList();
speechSynthesis.addEventListener("voiceschanged", loadVoiceList);
function loadVoiceList() {
	voiceSelect.innerHTML = "";
	tts.voiceList.forEach(item => {
		let op = document.createElement("option");
		op.innerHTML = item.name;
		op.innerHTML += item.localService ? "本地" : "在线";
		op.setAttribute("data-voiceName", item.name);
		if (item.name == tts.voiceName) op.setAttribute("selected", "true");
		voiceSelect.appendChild(op);
	});
}
voiceSelect.addEventListener("change", function () {
	let index = voiceSelect.selectedIndex;
	tts.voiceName = voiceSelect.options[index].getAttribute("data-voiceName");
});