# brofist-tr
Simple trainer. Небольшой хак (?).

###Для очень одаренных.
[index.js брать отсюда / index.js from here](https://raw.githubusercontent.com/trrx/brofist-tr/master/index.js)
```
0. Открываешь http://brofist.io/.
1. Вводишь ник, выбираешь сервер, заходишь в игру.
2. Переходишь по ссылке "брать отсюда", что выше.
3. Копируешь ВСЕ содержимое.
4. Открываешь консоль (F12 в хроме).
5. Вставляешь в консоль все.
6. Жмешь Enter.
7. Переходишь в игру и пишешь в чат команды. Например fly. В ЧАТ.
```
####Just copy and paste all code from index.js into the console and press Enter.

###Команды (вводить в чат)
```
fly							- включить\выключить полет 
pos							- получить свои координаты 
cp		<название_точки> 	 - checkpoint сохранить текущий, например cp test1 
goto 	<название_точки> 	 - перейти к чекпоинту, например goto test1 
tp		<ник> 			   - телепорт на игрока в зоне видимости, например tp Анюта 
tpc 	<x> <y> 			- телепорт по координатам, например tpc 348 -9 
name 	<новый_ник> 	    - изменить свой ник, например name test1 
skin 	<id_скина> 		 - изменить свой скин (от 0 до 7), например skin 3 
shit 	<таймаут в мс> 	  - начать делать это, например shit 1000 
shit 	stop 				- прекратить делать это 
status	<текст_статуса> 	- добавл¤ет мигающий статус над вами, отключается нажатием клавиши Enter, например status 2CH VIP 
speed 	<число> 			 - изменить скорость (стандартна¤ 300), например speed 800
magic 	<таймаут> 		   - магия, так же magic stop
```
####Команды прописываешь В ЧАТ ИГРЫ и нажимаешь Enter. Бака.

### Commands (type in chat)
```
fly 						- enable\disable fly mode 
pos 						- get your position 
cp 		<checkpoint_ name> 	- save checkpoint 
goto 	<checkpoint_ name> 	- move to checkpoint 
tp 		<name> 				- teleport to player (didn't works on long range) 
tpc 	<x> <y> 			- teleport to pos 
speed 	<number> 			- change your speed (def. 300) 
name 	<new_name> 			- change your name 
skin 	<0-7> 				- change your skin (min 0, max 7) 
status 	<status_string> 	- change your status 
```
