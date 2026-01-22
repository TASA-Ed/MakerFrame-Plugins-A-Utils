const $name = '【前置】工具插件',
$type = 2,
$path = ['TASA-Ed', 'A-Utils'],
$file = 'tasaed_A-Utils国际化插件.zip',
$date = '2025/12/16',
$update = '2025/12/16',
$version = '1.0.0',
$size = '16KB',
$author = 'TASA-Ed工作室',
$description = 'TASA-Ed所有插件的前置，通常也可以当做工具插件使用'
;

function* $install() {
    console.debug('安装成功');

    return true;
}

function* $uninstall() {
    console.debug('卸载成功');

    return null;
}
