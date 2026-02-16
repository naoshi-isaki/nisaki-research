const searchDelay = 600; 
let timeout = null;
const searchInput = document.getElementById('searchInput');

// サブディレクトリ（/research/）に対応したパスを取得
// baseURLが正しく設定されていれば、相対パス "index.json" で取得可能です
const searchIndexUrl = "index.json"; 

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        clearTimeout(timeout);
        const query = this.value;

        timeout = setTimeout(() => {
            if (query.length < 2) return; // 2文字未満は検索しない

            // index.jsonをフェッチして検索を実行する（簡易例）
            fetch(searchIndexUrl)
                .then(response => response.json())
                .then(data => {
                    // ここで data (index.jsonの中身) から query を検索する処理
                    console.log("Search results for:", query, data);
                })
                .catch(err => console.error("Search index not found:", err));
        }, searchDelay);
    });
}
