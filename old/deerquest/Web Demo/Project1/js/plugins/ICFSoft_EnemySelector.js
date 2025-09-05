//=============================================================================
// ICF-Soft Plugins - Enemy Selector
// ICFSoft_EnemySelector.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_EnemySelector = true;

var ICF = ICF || {};
ICF.EnemySelect = ICF.EnemySelect || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 This plugin allows you to change enemies before
 * start battle.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Absolute
 * @desc If true, enemy chage if var is equal to selector instead
 * of equal or higher.   NO - false     YES - true
 * @default false
 *
 * @param Enemy Var
 * @desc The  game variable where the selector is stored.
 * @default 40
 *
 * @help
 * ============================================================================
 * Introduction
 * 
 * In database we have a 2000 item cap per tab. So we have up to 2000 different
 * enemies and up to 2000 enemy groups.
 * It's usual to use some groups for a different number of same enemy
 * (ex: 2 and 3 bats) and different enemy combinations, so a less number of enemy
 * types are used.
 * 
 * This plugin allow to increase the number of used enemies and, at same time,
 * use a lower number of enemy groups.
 * 
 * Main utility is to implement an ingame difficult increase system with different
 * enemies.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * Absolute: Tell if value must be exact to swap enemy.
 * When off enemy will change if value is equal or higher, making an ingame
 * difficult increase system.
 * 
 * Enemy Var: Tell wich variable vill be used as selector.
 * 
 * ============================================================================
 * Config enemies
 * ============================================================================
 * 
 * Enemies are configured via notetags.
 * 
 * Starts with "<ENEMY SELECTOR>", then the selectors come in succesive lines.
 * Pairs of number separated by ":" first is the value for the selector and
 * segond is enemy id will be changed.
 * Selectors must be in ascending order.
 * And finish with "</ENEMY SELECTOR>".
 * 
 * Example:
 * 
 * <ENEMY SELECTOR>
 * 1:2
 * 2:10
 * </ENEMY SELECTOR>
 * 
 * This enemy will change to database enemy 2 when selected variable become 1.
 * Or will be database enemy 10 if selected variable become 2.
 * 
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 * 
 * There's no known incompatible plugins yet.
 * 
 * ============================================================================
 * Known isues
 * ============================================================================
 * 
 * Different enemy sizes can look weird.
 * Pointer position is on bottom left corner.
 * 
 * ============================================================================
 * 
 * Commercial use avaiable.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
//=============================================================================
 /*:es
 * @plugindesc v1.00 Este complemento permite cambiar los enemigos antes
 * de que la batalla comience.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Absolute
 * @desc Si se activa, el enemigo cambiará solo si coincide el
 * selector, si no, cuando sea mayor o igual.  No - false   Si - true
 * @default false
 *
 * @param Enemy Var
 * @desc La variable donde se almacena el selector.
 * @default 40
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 * 
 * En la base de datos hay un tope de 2000 elementos por pestaña. Por un lado
 * tenemos hasta 2000 enemigos distintos y por otro hasta 2000 grupos de enemigos
 * a los que se puede enfrentar en el juego.
 * Normalmente no se utiliza un grupo para cada enemigo, sino varios grupos con dos
 * o tres enemigos del mismo tipo y diversas combinaciones de enemigos, por lo que
 * en realidad se utilizan bastantes tipos de enemigos menos.
 * 
 * Este script permite aprovechar el máximo de enemigos posible reduciendo,
 * a su vez, el número de grupos de enemigos.
 * 
 * La utilidad principal reside en que se puede hacer un sistema de dificultad
 * creciente y/o aprovechar mejor el número de enemigos de la base de datos.
 * 
 * ============================================================================
 * Parámetros
 * ============================================================================
 * 
 * Absolute: Indica si el valor debe ser exacto para que el enemigo cambie.
 * Cuando está desactivado el enemigo cambiará cuando el valor sea mayor o igual,
 * haciendo un sistema de dificultad creciente.
 * 
 * Enemy Var: Indica qué variable vas a utilizar para almacenar el selector.
 * 
 * ============================================================================
 * Configurar los enemigos
 * ============================================================================
 * 
 * Los enemigos se configuran en la base de datos en el apartado de las notas.
 * 
 * Se empieza una línea con "<ENEMY SELECTOR>", se ponen en cada línea sucesiva
 * los números en pares separados por ":" en donde el primero es el valor que debe
 * tomar el selector y el segundo el enemigo por el que se cambia en ese caso.
 * Los selectores deben ir en orden ascendente.
 * Finalmente se termina con la línea "</ENEMY SELECTOR>".
 * 
 * Ejemplo:
 * 
 * <ENEMY SELECTOR>
 * 1:2
 * 2:10
 * </ENEMY SELECTOR>
 * 
 * Este enemigo cuando la variable escogida valga 1 será sustituido por el enemigo
 * número 2 de la base de datos.
 * En cambio, si la variable vale 2 será sustituido por el enemigo número 10 de la
 * base de datos.
 * 
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 * 
 * No se conocen complementos que sean incompatibles hasta la fecha.
 * 
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 * 
 * Si los enemigos que se intercambian son de distintos tamaños pueden quedar
 * vistosamente mal colocados.
 * La posición viene definida por la esquina inferior izquierda.
 * 
 * ============================================================================
 * 
 * Se permite el uso comercial.
 * Se debe incluir a ICF-Soft en los créditos.
 * Esta cabecera debe incluirse íntegramente con el plugin.
 * 
 * ============================================================================
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_EnemySelector');
ICF.Param = ICF.Param || {};

ICF.Param.EnemyVarAbsolute = ICF.Parameters['Absolute'].toLowerCase() === "true";
ICF.Param.EnemyVar = Number(ICF.Parameters['Enemy Var']);

//=============================================================================
// DataManager
//=============================================================================

ICF.EnemySelect.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!ICF.EnemySelect.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processEnemySelectNotetags($dataEnemies);
    return true;
};

DataManager.processEnemySelectNotetags = function(group) {
  var note1 = /<(?:ENEMY SELECTOR)>/i;
  var note2 = /<\/(?:ENEMY SELECTOR)>/i;
  ICF.EnemySelect.Enemies = [];
  for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var notedata = obj.note.split(/[\r\n]+/);

	ICF.EnemySelect.Enemies[n] = [];

	var esFlag = false;

	  for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			esFlag = true;
		} else if (line.match(note2)) {
			esFlag = false;
		} else if (esFlag) {
			line = line.split(":");
			if ((line.length > 1)&&(line[0] != NaN)&&(line[1] != NaN)) {
				ICF.EnemySelect.Enemies[n].push(line);
			}
		}
	  }
  }
};

//=============================================================================
// Game_Enemy
//=============================================================================

ICF.EnemySelect.setupEnemy = Game_Enemy.prototype.initialize;
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
	var converted = enemyId;
        var ary = ICF.EnemySelect.Enemies[enemyId];

	if (ary.length == 0) {
		converted = enemyId;
	} else if (ICF.Param.EnemyVarAbsolute) {
		for (i = 0; i < ary.length; i++) {
			if (ary[i][0] == $gameVariables.value(ICF.Param.EnemyVar)) {
				converted = ary[i][1];
				break;
			}
		}
	} else {
		for (i = ary.length - 1; i >= 0; i--) {
			if (ary[i][0] <= $gameVariables.value(ICF.Param.EnemyVar)) {
				converted = ary[i][1];
				break;
			}
		}
	}
	ICF.EnemySelect.setupEnemy.call(this, converted, x, y);
};

//=============================================================================
// End of File
//=============================================================================
