const path = require('path');
const { AutoLanguageClient } = require('atom-languageclient');

class VueLanguageClient extends AutoLanguageClient {
	getGrammarScopes () { return atom.config.get('ide-vue.additionalGrammars').concat(['text.html.vue']); };
	getLanguageName () { return 'Vue' };
	getServerName () { return 'Vetur' };

	startServerProcess () {
		const args = ['node_modules/vue-language-server/dist/vueServerMain'];
		return super.spawnChildNode(args, { cwd : path.join(__dirname, '..') });
	};

	preInitialization (connection) {
		connection.onCustom('$/partialResult', () => {}); // Suppress partialResult until the language server honours 'streaming' detection
	}
}

module.exports = new VueLanguageClient();
