const openDebugger = (
  text = '劳烦您尊重一下别人的劳动成果，想要看源代码，联系作者本人好吗?'
) => {
  (function () {
    document.oncontextmenu = function () {
      return false;
    };
    var callbacks = [],
      timeLimit = 50;
    loop();
    return {
      addListener: function (fn) {
        callbacks.push(fn);
      },
      cancelListener: function (fn) {
        callbacks = callbacks.filter(function (f) {
          return f !== fn;
        });
      }
    };
    function loop() {
      var start = new Date();
      debugger;
      if (new Date() - start > timeLimit) {
        callbacks.forEach(function (fn) {
          fn.call(null);
        });
        alert(text);
      }
      return setTimeout(loop, 1);
    }
  })().addListener(function () {
    window.location.reload();
  });
};
export default openDebugger;
