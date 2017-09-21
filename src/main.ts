import path from 'path';
import { AutoLanguageClient } from 'atom-languageclient';
import cp = require('child_process');

class VueLanguageClient extends AutoLanguageClient {
	private _serverManager;

	getGrammarScopes () { return atom.config.get('ide-vue.additionalGrammars').concat(['text.html.vue']); };
	getLanguageName () { return 'Vue' };
	getServerName () { return 'Vetur' };

	startServerProcess () {
		return cp.spawn('node', [require.resolve('vue-language-server/dist/vueServerMain')]);
	};

	preInitialization (connection) {
		connection.onCustom('$/partialResult', () => {}); // Suppress partialResult until the language server honours 'streaming' detection
	}
}

export =  new VueLanguageClient();
