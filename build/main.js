"use strict";
const atom_languageclient_1 = require("atom-languageclient");
const cp = require("child_process");
class VueLanguageClient extends atom_languageclient_1.AutoLanguageClient {
    getGrammarScopes() { return ['text.html.vue']; }
    ;
    getLanguageName() { return 'Vue'; }
    ;
    getServerName() { return 'MBRW'; }
    ;
    startServerProcess() {
        return cp.spawn('node', [require.resolve('vue-language-server/dist/vueServerMain')]);
    }
    ;
    preInitialization(connection) {
        connection.onCustom('$/partialResult', () => { }); // Suppress partialResult until the language server honours 'streaming' detection
    }
}
module.exports = new VueLanguageClient();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw2REFBeUQ7QUFDekQsb0NBQXFDO0FBRXJDLHVCQUF3QixTQUFRLHdDQUFrQjtJQUdqRCxnQkFBZ0IsS0FBTSxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQ2pELGVBQWUsS0FBTSxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDcEMsYUFBYSxLQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUVuQyxrQkFBa0I7UUFDakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBQUEsQ0FBQztJQUVGLGlCQUFpQixDQUFFLFVBQVU7UUFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxRQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsaUZBQWlGO0lBQ3BJLENBQUM7Q0FDRDtBQUVELGlCQUFVLElBQUksaUJBQWlCLEVBQUUsQ0FBQyJ9