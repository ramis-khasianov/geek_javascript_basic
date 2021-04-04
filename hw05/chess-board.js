const chessGame = {
    containerElement: null,
    totalRows: 8,
    totalColumns: 8,
    boardElements: [],
    columnTitles: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    figures: [
        {id: 'blackRook1', type: 'rook', color: 'black', symbol: 'Л', img: '', initialPosition: 'cell81', currentPosition: 'cell81'},
        {id: 'blackKnight1', type: 'knight', color: 'black', symbol: 'К', img: '', initialPosition: 'cell82', currentPosition: 'cell82'},
        {id: 'blackBishop1', type: 'bishop', color: 'black', symbol: 'С', img: '', initialPosition: 'cell83', currentPosition: 'cell83'},
        {id: 'blackQueen', type: 'queen', color: 'black', symbol: 'Ф', img: '', initialPosition: 'cell84', currentPosition: 'cell84'},
        {id: 'blackKing', type: 'king', color: 'black', symbol: 'К', img: '', initialPosition: 'cell85', currentPosition: 'cell85'},
        {id: 'blackBishop2', type: 'bishop', color: 'black', symbol: 'С', img: '', initialPosition: 'cell86', currentPosition: 'cell86'},
        {id: 'blackKnight2', type: 'knight', color: 'black', symbol: 'К', img: '', initialPosition: 'cell87', currentPosition: 'cell87'},
        {id: 'blackRook2', type: 'rook', color: 'black', symbol: 'Л', img: '', initialPosition: 'cell88', currentPosition: 'cell88'},
        {id: 'blackPawn1', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell71', currentPosition: 'cell71'},
        {id: 'blackPawn2', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell72', currentPosition: 'cell72'},
        {id: 'blackPawn3', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell73', currentPosition: 'cell73'},
        {id: 'blackPawn4', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell74', currentPosition: 'cell74'},
        {id: 'blackPawn5', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell75', currentPosition: 'cell75'},
        {id: 'blackPawn6', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell76', currentPosition: 'cell76'},
        {id: 'blackPawn7', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell77', currentPosition: 'cell77'},
        {id: 'blackPawn8', type: 'pawn', color: 'black', symbol: 'П', img: '', initialPosition: 'cell78', currentPosition: 'cell78'},

        {id: 'WhiteRook1', type: 'rook', color: 'white', symbol: 'Л', img: '', initialPosition: 'cell11', currentPosition: 'cell11'},
        {id: 'WhiteKnight1', type: 'knight', color: 'white', symbol: 'К', img: '', initialPosition: 'cell12', currentPosition: 'cell12'},
        {id: 'WhiteBishop1', type: 'bishop', color: 'white', symbol: 'С', img: '', initialPosition: 'cell13', currentPosition: 'cell13'},
        {id: 'WhiteQueen', type: 'queen', color: 'white', symbol: 'Ф', img: '', initialPosition: 'cell14', currentPosition: 'cell14'},
        {id: 'WhiteKing', type: 'king', color: 'white', symbol: 'К', img: '', initialPosition: 'cell15', currentPosition: 'cell15'},
        {id: 'WhiteBishop2', type: 'bishop', color: 'white', symbol: 'С', img: '', initialPosition: 'cell16', currentPosition: 'cell16'},
        {id: 'WhiteKnight2', type: 'knight', color: 'white', symbol: 'К', img: '', initialPosition: 'cell17', currentPosition: 'cell17'},
        {id: 'WhiteRook2', type: 'rook', color: 'white', symbol: 'Л', img: '', initialPosition: 'cell18', currentPosition: 'cell18'},
        {id: 'WhitePawn1', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell21', currentPosition: 'cell21'},
        {id: 'WhitePawn2', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell22', currentPosition: 'cell22'},
        {id: 'WhitePawn3', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell23', currentPosition: 'cell23'},
        {id: 'WhitePawn4', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell24', currentPosition: 'cell24'},
        {id: 'WhitePawn5', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell25', currentPosition: 'cell25'},
        {id: 'WhitePawn6', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell26', currentPosition: 'cell26'},
        {id: 'WhitePawn7', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell27', currentPosition: 'cell27'},
        {id: 'WhitePawn8', type: 'pawn', color: 'white', symbol: 'П', img: '', initialPosition: 'cell28', currentPosition: 'cell28'},
    ],


    // Функция чтобы сгенерить div элемент с лэйблом внутри
    createInfoCell(type, cellIndex){
        const infoCell = document.createElement('div')
        infoCell.classList.add('chess-info-cell')
        switch (type) {
            case 'row':
                infoCell.innerText= cellIndex;
                break;
            case 'column':
                infoCell.innerText = this.columnTitles[cellIndex]
                break
        }
        return infoCell
    },

    // Функция чтобы сгенерить первый и последний ряд в котором лейблы для колонок
    createColumnLabelsRow(){
        const rowInfoElem = document.createElement('div')
        rowInfoElem.classList.add('chess-column-labels-row')
        for (let col = 0; col < this.totalColumns; col++){
            rowInfoElem.appendChild(this.createInfoCell('column', col))
        }
        return rowInfoElem
    },

    init(containerElementId) {
        this.containerElement = document.getElementById(containerElementId)
        this.initBoard()
        this.initFigures()
    },

    // Метод формирующий доску
    initBoard() {

        this.containerElement.innerHTML = '';
        this.boardElements = [];

        // Добавляем ряд лейблов для колонок
        this.containerElement.appendChild(this.createColumnLabelsRow())

        // Формируем восемь рядов ячеек
        // Цикл в обратном порядке чтобы проставить индексы на ячейки "Как у реальной доски"
        for (let row = this.totalRows; row > 0; row--) {

            // По остатку от целочисленного деления определяем какого цвета должна быть первая ячейка в ряде
            let isBlack = row % 2 === 1

            const rowElem = document.createElement('div')
            rowElem.classList.add('chess-row')
            this.containerElement.appendChild(rowElem)

            // Добавляем лейбл в начале ряда
            rowElem.appendChild(this.createInfoCell('row', row))

            // Формируем 8 клеток ряда
            for (let col = 0; col < this.totalColumns; col++){


                const cell = document.createElement('div');
                cell.classList.add('chess-cell')

                if (isBlack) {
                    cell.classList.add('black-cell')
                }
                isBlack = !isBlack;

                cell.id = 'cell' + (row * 10 + col + 1).toString() // Проставляем коды как число с двумя знакми - первое это номер ряда, второе номер колонки
                rowElem.appendChild(cell);
                this.boardElements.push(cell)
            }

            // Добавляем лейбл в конце ряда
            rowElem.appendChild(this.createInfoCell('row', row))
        }
        // Добавляем ряд лейблов для колонок
        this.containerElement.appendChild(this.createColumnLabelsRow())

    },

    // Метод, располагающий фигуры на доске
    initFigures(){
        for (let figure of this.figures) {
            const figureCell = document.getElementById(figure.initialPosition)
            figureCell.innerText = figure.symbol
            if (figure.color === 'black') {
                figureCell.classList.add('black-figure')
            }
        }
    }
}

chessGame.init('chess-board')