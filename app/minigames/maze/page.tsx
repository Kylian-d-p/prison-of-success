"use client";
import React, { useState, useEffect, useCallback } from "react";

// Constantes pour la taille du labyrinthe
const MAZE_WIDTH = 15;
const MAZE_HEIGHT = 15;
const CELL_SIZE = 30;

// Types pour les directions et la position du joueur
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

// Génération du labyrinthe avec l'algorithme de recursive backtracking
const generateMaze = (width: number, height: number): string[][] => {
  const maze: string[][] = Array(height)
    .fill(null)
    .map(() => Array(width).fill("#")); // Remplir le labyrinthe avec des murs

  const carve = (x: number, y: number) => {
    maze[y][x] = " "; // Creuser un chemin

    // Directions aléatoires
    const directions: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
    directions.sort(() => Math.random() - 0.5);

    for (const direction of directions) {
      const nx =
        x + (direction === "LEFT" ? -2 : direction === "RIGHT" ? 2 : 0);
      const ny = y + (direction === "UP" ? -2 : direction === "DOWN" ? 2 : 0);

      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        maze[ny][nx] === "#"
      ) {
        maze[ny][nx] = " "; // Creuser un chemin
        maze[y + (ny - y) / 2][x + (nx - x) / 2] = " "; // Creuser entre les deux cellules
        carve(nx, ny);
      }
    }
  };

  carve(1, 1); // Commencer à creuser à partir d'une position aléatoire
  maze[1][1] = "P"; // Position de départ du joueur
  maze[height - 2][width - 2] = "E"; // Position de la sortie
  return maze;
};

const Maze: React.FC = () => {
  const [maze, setMaze] = useState<string[][]>([]);
  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: 1,
    y: 1,
  });
  const [orientation, setOrientation] = useState<"RIGHT" | "LEFT">("RIGHT");

  // Générer le labyrinthe au chargement du composant
  useEffect(() => {
    setMaze(generateMaze(MAZE_WIDTH, MAZE_HEIGHT));
  }, []);

  // Fonction pour déplacer le joueur
  const movePlayer = useCallback(
    (direction: Direction) => {
      const { x, y } = playerPosition;
      let newX = x;
      let newY = y;

      switch (direction) {
        case "UP":
          newY = y - 1;
          break;
        case "DOWN":
          newY = y + 1;
          break;
        case "LEFT":
          newX = x - 1;
          setOrientation("LEFT");
          break;
        case "RIGHT":
          newX = x + 1;
          setOrientation("RIGHT");
          break;
        default:
          return;
      }

      // Vérifier si le mouvement est valide
      if (maze[newY] && maze[newY][newX] !== "#") {
        setPlayerPosition({ x: newX, y: newY });

        // Vérifier si le joueur a atteint la sortie
        if (maze[newY][newX] === "E") {
          alert("Félicitations, vous vous êtes échappé");
          window.location.href = "/play";
          // setMaze(generateMaze(MAZE_WIDTH, MAZE_HEIGHT)); // Régénérer le labyrinthe
          // setPlayerPosition({ x: 1, y: 1 }); // Réinitialiser la position du joueur
        }
      }
    },
    [maze, playerPosition]
  );

  // Gestion des touches du clavier
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          movePlayer("UP");
          break;
        case "ArrowDown":
          movePlayer("DOWN");
          break;
        case "ArrowLeft":
          movePlayer("LEFT");
          break;
        case "ArrowRight":
          movePlayer("RIGHT");
          break;
        default:
          return;
      }
    },
    [movePlayer]
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        outline: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="text-8xl mb-25">Labyrinthe</h1>
      <div className="flex w-full justify-evenly h-sreen">
        <div style={{ border: "2px solid black" }}>
          {maze.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {row.map((cell, x) => (
                <div
                  key={x}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor:
                      cell === "#"
                        ? "#f7a9a7"
                        : cell === "E"
                        ? "#202d40"
                        : "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid gray",
                    transform:
                      x === playerPosition.x &&
                      y === playerPosition.y &&
                      orientation === "RIGHT"
                        ? "scaleX(-1)"
                        : "",
                  }}
                >
                  {x === playerPosition.x && y === playerPosition.y
                    ? "🚶🏻"
                    : cell === "E"
                    ? "🚪"
                    : ""}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Boutons de déplacement */}
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => movePlayer("UP")}
            style={{ margin: "5px", padding: "10px" }}
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="70px"
              height="50px"
              viewBox="0 0 3000.000000 2000.000000"
              preserveAspectRatio="xMidYMid meet"
              className="transform rotate-90"
            >
              <g
                transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M9845 16091 c-606 -320 -3238 -2119 -5505 -3761 -1751 -1269 -2995
-2229 -3581 -2766 -213 -195 -329 -334 -329 -394 0 -178 1151 -896 3325 -2072
2423 -1312 5811 -3000 6456 -3218 53 -18 104 -30 113 -27 23 9 33 40 50 159
63 431 74 2104 27 4053 -5 198 -8 361 -7 362 1 2 139 -11 307 -27 1665 -165
3789 -355 5094 -455 1266 -97 1829 -129 2955 -170 4536 -165 8805 -285 10151
-285 l406 0 11 72 c63 403 165 1926 228 3388 29 694 29 1708 0 1738 -12 11
-545 6 -786 -7 -2350 -131 -8474 -652 -17278 -1472 -596 -55 -1085 -99 -1086
-97 -5 5 -65 1069 -96 1683 -36 730 -37 758 -55 1310 -40 1224 -88 1727 -186
1955 -22 52 -59 90 -88 90 -9 0 -65 -27 -126 -59z"
                />
              </g>
            </svg>
          </button>
          <div>
            <button
              onClick={() => movePlayer("LEFT")}
              style={{ margin: "5px", padding: "10px" }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="70px"
                height="50px"
                viewBox="0 0 3000.000000 2000.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M9845 16091 c-606 -320 -3238 -2119 -5505 -3761 -1751 -1269 -2995
-2229 -3581 -2766 -213 -195 -329 -334 -329 -394 0 -178 1151 -896 3325 -2072
2423 -1312 5811 -3000 6456 -3218 53 -18 104 -30 113 -27 23 9 33 40 50 159
63 431 74 2104 27 4053 -5 198 -8 361 -7 362 1 2 139 -11 307 -27 1665 -165
3789 -355 5094 -455 1266 -97 1829 -129 2955 -170 4536 -165 8805 -285 10151
-285 l406 0 11 72 c63 403 165 1926 228 3388 29 694 29 1708 0 1738 -12 11
-545 6 -786 -7 -2350 -131 -8474 -652 -17278 -1472 -596 -55 -1085 -99 -1086
-97 -5 5 -65 1069 -96 1683 -36 730 -37 758 -55 1310 -40 1224 -88 1727 -186
1955 -22 52 -59 90 -88 90 -9 0 -65 -27 -126 -59z"
                  />
                </g>
              </svg>
            </button>
            <button
              onClick={() => movePlayer("RIGHT")}
              style={{ margin: "5px", padding: "10px" }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="70px"
                height="50px"
                viewBox="0 0 3000.000000 2000.000000"
                preserveAspectRatio="xMidYMid meet"
                className="transform rotate-180"
              >
                <g
                  transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M9845 16091 c-606 -320 -3238 -2119 -5505 -3761 -1751 -1269 -2995
-2229 -3581 -2766 -213 -195 -329 -334 -329 -394 0 -178 1151 -896 3325 -2072
2423 -1312 5811 -3000 6456 -3218 53 -18 104 -30 113 -27 23 9 33 40 50 159
63 431 74 2104 27 4053 -5 198 -8 361 -7 362 1 2 139 -11 307 -27 1665 -165
3789 -355 5094 -455 1266 -97 1829 -129 2955 -170 4536 -165 8805 -285 10151
-285 l406 0 11 72 c63 403 165 1926 228 3388 29 694 29 1708 0 1738 -12 11
-545 6 -786 -7 -2350 -131 -8474 -652 -17278 -1472 -596 -55 -1085 -99 -1086
-97 -5 5 -65 1069 -96 1683 -36 730 -37 758 -55 1310 -40 1224 -88 1727 -186
1955 -22 52 -59 90 -88 90 -9 0 -65 -27 -126 -59z"
                  />
                </g>
              </svg>
            </button>
          </div>
          <button
            onClick={() => movePlayer("DOWN")}
            style={{ margin: "5px", padding: "10px" }}
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="70px"
              height="50px"
              viewBox="0 0 3000.000000 2000.000000"
              preserveAspectRatio="xMidYMid meet"
              className="transform rotate-270"
            >
              <g
                transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M9845 16091 c-606 -320 -3238 -2119 -5505 -3761 -1751 -1269 -2995
-2229 -3581 -2766 -213 -195 -329 -334 -329 -394 0 -178 1151 -896 3325 -2072
2423 -1312 5811 -3000 6456 -3218 53 -18 104 -30 113 -27 23 9 33 40 50 159
63 431 74 2104 27 4053 -5 198 -8 361 -7 362 1 2 139 -11 307 -27 1665 -165
3789 -355 5094 -455 1266 -97 1829 -129 2955 -170 4536 -165 8805 -285 10151
-285 l406 0 11 72 c63 403 165 1926 228 3388 29 694 29 1708 0 1738 -12 11
-545 6 -786 -7 -2350 -131 -8474 -652 -17278 -1472 -596 -55 -1085 -99 -1086
-97 -5 5 -65 1069 -96 1683 -36 730 -37 758 -55 1310 -40 1224 -88 1727 -186
1955 -22 52 -59 90 -88 90 -9 0 -65 -27 -126 -59z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maze;
