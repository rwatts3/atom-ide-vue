import path from 'path';
import { AutoLanguageClient } from 'atom-languageclient';
import cp = require('child_process');

class VueLanguageClient extends AutoLanguageClient {
	private _serverManager;

	getGrammarScopes () { return ['text.html.vue'] };
	getLanguageName () { return 'Vue' };
	getServerName () { return 'MBRW' };

	startServerProcess () {
		return cp.spawn('node', [require.resolve('vue-language-server/dist/vueServerMain')]);
	};

	preInitialization (connection) {
		connection.onCustom('$/partialResult', () => {}); // Suppress partialResult until the language server honours 'streaming' detection
	}
}

export =  new VueLanguageClient();
