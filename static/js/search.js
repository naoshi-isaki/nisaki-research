document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    let searchData = [];

    // 1. index.json（データカタログ）を読み込む
    // サブディレクトリ対策としてスラッシュなしの 'index.json' を指定
    fetch('index.json')
        .then(response => {
            if (!response.ok) throw new Error("Index not found");
            return response.json();
        })
        .then(data => {
            searchData = data;
            console.log("Search index loaded successfully.");
        })
        .catch(err => console.error("Search error:", err));

    // 2. 入力を監視して検索を実行
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // 2文字未満なら結果をクリアして終了
            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            // タイトルまたは本文にキーワードが含まれる記事を抽出
            const results = searchData.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.content.toLowerCase().includes(query);
            });

            // 3. 結果を表示
            renderResults(results);
        });
    }

    // 4. 結果を画面に出力する関数
    function renderResults(results) {
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-slate-500">一致する記事が見つかりませんでした。</p>';
            return;
        }

        resultsContainer.innerHTML = results.map(item => `
            <div class="search-result-item mb-4">
                <a href="${item.uri}" class="block p-4 border-2 border-slate-300 rounded-xl hover:border-indigo-500 no-underline transition-all">
                    <h4 class="text-base font-extrabold text-slate-800 dark:text-slate-100">${item.title}</h4>
                    <p class="text-[12px] text-slate-500 mt-1 line-clamp-2">${item.content.substring(0, 100)}...</p>
                </a>
            </div>
        `).join('');
    }
});
