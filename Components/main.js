//.pragma library

.import 'logger.js' as Logger

// 是否游戏启动时自动加载（为false不自动加载，其他值都是自动加载，不自动加载的组件，调用 game.plugin 后才会加载，且没有加载的组件不会运行 $timerTriggered 函数
// 系统中还用它来识别是否已加载；
var $autoLoad = true;
// 描述
const $description = '工具插件';

// 载入 函数（游戏第一次运行时会执行，所以在这里创建组件）
function $load(path) {
    console.debug('[Plugin] Load 工具插件', path);

    $Frame.sl_globalObject().Logger = Logger;

    return null;
}

//卸载 函数（退出游戏时会执行，用来删除组件）
function $unload() {
    console.debug('[Plugins] Unload 工具插件');

    delete $Frame.sl_globalObject().Logger;

    return null;
}
