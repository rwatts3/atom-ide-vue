var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require('path');
const { AutoLanguageClient } = require('atom-languageclient');
const { filter } = require('fuzzaldrin-plus');
const cp = require('child_process');
class VueLanguageClient extends AutoLanguageClient {
    getGrammarScopes() { return ['text.html.vue']; }
    ;
    getLanguageName() { return 'Vue'; }
    ;
    getServerName() { return 'MBRW'; }
    ;
    startServerProcess() {
        return cp.spawn('node', [require.resolve('vue-language-server/dist/vueServerMain')]);
        // return super.spawnChildNode([ require.resolve('vue-language-server/dist/vueServerMain') ]);
    }
    ;
    preInitialization(connection) {
        connection.onCustom('$/partialResult', () => { }); // Suppress partialResult until the language server honours 'streaming' detection
    }
    getSuggestions(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = request.prefix.trim();
            const server = yield this._serverManager.getServer(request.editor);
            if (prefix === '' && !request.activatedManually) {
                server.currentSuggestions = [];
                return Promise.resolve([]);
            }
            if (prefix.length > 0 && prefix != '.' && server.currentSuggestions && server.currentSuggestions.length > 0) {
                // fuzzy filter on this.currentSuggestions
                return new Promise((resolve) => {
                    const filtered = filter(server.currentSuggestions, prefix, { key: 'text' })
                        .map(s => Object.assign({}, s, { replacementPrefix: prefix }));
                    resolve(filtered);
                });
            }
            if (request.activatedManually === true || request.prefix.startsWith('.')) {
                return this.requestAndCleanSuggestions(request)
                    .then(suggestions => server.currentSuggestions = suggestions);
            }
            else {
                server.currentSuggestions = [];
                return Promise.resolve([]);
            }
        });
    }
    requestAndCleanSuggestions(request) {
        return super.getSuggestions(request).then(results => {
            if (results != null) {
                for (const result of results) {
                    if (result.leftLabel) {
                        const index = result.leftLabel.lastIndexOf(':');
                        if (index > 0) {
                            result.leftLabel = result.leftLabel.substr(index + 1).trim();
                        }
                    }
                }
            }
            return results;
        });
    }
}
module.exports = new VueLanguageClient();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzVELE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFcEMsdUJBQXdCLFNBQVEsa0JBQWtCO0lBR2pELGdCQUFnQixLQUFNLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDakQsZUFBZSxLQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUNwQyxhQUFhLEtBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUM7SUFBQSxDQUFDO0lBRW5DLGtCQUFrQjtRQUNqQixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLDhGQUE4RjtJQUMvRixDQUFDO0lBQUEsQ0FBQztJQUVGLGlCQUFpQixDQUFFLFVBQVU7UUFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxRQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsaUZBQWlGO0lBQ3BJLENBQUM7SUFFSyxjQUFjLENBQUUsT0FBTzs7WUFDNUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVuRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDakQsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUssTUFBTSxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUcsMENBQTBDO2dCQUMxQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPO29CQUMxQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsQ0FBQzt5QkFDdkUsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDO3FCQUM3QyxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNGLENBQUM7S0FBQTtJQUdGLDBCQUEwQixDQUFFLE9BQU87UUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDL0MsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2YsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzlELENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUE7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=