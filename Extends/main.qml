import QtQuick 2.14
import QtQuick.Window 2.14
import QtQuick.Controls 2.14
import QtQuick.Dialogs 1.3 as Dialog1
import QtQuick.Layouts 1.14

import _Global 1.0

Item {
    id: root

    signal sg_close();

    anchors.fill: parent

    focus: true
    clip: true

    Mask {
        anchors.fill: parent
        color: Global.style.backgroundColor
    }


    StackView {
        id: stackView
        anchors.fill: parent

        initialItem: compMainView
    }

    Component {
        id: compMainView

        Item {
            ColumnLayout {
                anchors.centerIn: parent
                width: parent.width * 0.9
                height: parent.height * 0.9

                Notepad {
                    id: textHelp

                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    Layout.maximumHeight: parent.height

                    nMaximumBlockCount: 0

                    textArea.placeholderText: ''

                    textArea.background: Rectangle {
                        color: Global.style.backgroundColor
                        border.color: parent.parent.textArea.activeFocus ? Global.style.accent : Global.style.hintTextColor
                        border.width: parent.parent.textArea.activeFocus ? 2 : 1
                    }

                    textArea.text: $CommonLibJS.convertToHTML(
`<b>工具插件</b>

作者: TASA-Ed 工作室

`, )
                }

                RowLayout {
                    Layout.alignment: Qt.AlignCenter

                    Button {
                        Layout.alignment: Qt.AlignCenter

                        text: '关　闭'
                        onClicked: {
                            sg_close();
                        }
                    }
                }
            }
        }
    }



    QObject {
        id: _private

    }



    Keys.onEscapePressed: function(event) {
        console.debug("[Plugins]Keys.onEscapePressed");
        event.accepted = true;

        sg_close();
    }
    Keys.onBackPressed: function(event) {
        console.debug("[Plugins]Keys.onBackPressed");
        event.accepted = true;

        sg_close();
    }
    Keys.onPressed: function(event) {
        console.debug('[Plugins]Keys.onPressed:', event, event.key, event.text, event.isAutoRepeat);
        event.accepted = true;
    }
    Keys.onReleased: function(event) {
        console.debug('[Plugins]Keys.onReleased:', event.key, event.isAutoRepeat);
        event.accepted = true;
    }


    Component.onCompleted: {
        console.debug('[Plugins]Component.onCompleted:I18n');
    }
    Component.onDestruction: {
        console.debug("[Plugins]Component.onDestruction:I18n");
    }
}
