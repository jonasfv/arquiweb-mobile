
        const songs = [
            { title: "APT", artist: "Rose ft Bruno Mars", image: "img/apt.jpg" },
            { title: "Die with a Smile", artist: "Bruno Mars ft Lady Gaga", image: "img/dieWhitSmile.PNG" },
            { title: "Enemy", artist: "Imagine Dragons", image: "img/enemyIMG.PNG" },
            { title: "The Line", artist: "Twenty One Pilots", image: "img/theLineTwentyOnePilots.PNG" },
            { title: "Ma Meilleure Ennemie", artist: "Stromae & Pomme", image: "img/mailleureEnnemie.PNG" },
        ];

        const rankingList = document.getElementById("ranking");
        const botonMezclar = document.getElementById("botonMezclar");
        const botonCaptura = document.getElementById("botonCaptura");
        const imageContainer = document.getElementById("imageContainer");


        let rankingOriginal = [...songs];

        function renderRanking(songs, arrows = []) {
			//borrado de lista
            rankingList.innerHTML = ""; 
			songs.forEach((song, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <img src="${song.image}" alt="${song.title}">
                        <span>${index + 1}. ${song.title} - ${song.artist}</span>
                    </div>
                    <span>${arrows[index] || ""}</span>
                `;
                rankingList.appendChild(li);
            });
			console.log("Ranking generado.");
        }

        function mezclarRanking() {

            const currentRanking = [...rankingOriginal];
            const newRanking = [...rankingOriginal].sort(() => Math.random() - 0.5);
            const arrows = newRanking.map((song, newIndex) => {
                const oldIndex = currentRanking.indexOf(song);
                if (newIndex < oldIndex) return "⬆️"; 
                if (newIndex > oldIndex) return "⬇️"; 
                return "➖"; 
            });
            renderRanking(newRanking, arrows);
            rankingOriginal = [...newRanking];
			console.log("Nuevo ranking generado.");
        }

		
        function captura() {
            html2canvas(rankingList).then(canvas => {
                imageContainer.innerHTML = ""; 
                imageContainer.appendChild(canvas);
                console.log("Imagen generada.");
				const image = canvas.toDataURL("image/png");
				const link = document.createElement("a");
				link.href = image;
				link.download = "captura.png"; 
				link.click();
            });
        } 
		
	


        renderRanking(rankingOriginal);

        botonMezclar.addEventListener("click", mezclarRanking);
        botonCaptura.addEventListener("click", captura);