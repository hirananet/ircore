import { RawMessage } from './../../domain/rawMessage';
import { MessageData } from 'ircore';

export class IRCParserV3 {

  public static process(socketMessage: MessageData) {
    const raw = new RawMessage(socketMessage.message, socketMessage.uuid);
    if (raw.code === 'PRIVMSG') {
      return this.onPrivMSG(raw);
    }
    if (raw.code === 'NOTICE') {
      return this.onNotice(raw);
    }
    if (raw.code === 'JOIN') {
      return this.onJoin(raw);
    }
    if (raw.code === 'PART') {
      return this.onPart(raw);
    }
    if (raw.code === 'MODE') {
      return this.onModeCommand(raw);
    }
    if (raw.code === 'NICK') {
      return this.onNickChanged(raw);
    }
    if (raw.code === 'TOPIC') {
      return this.onChannelTopicChanged(raw, true);
    }
    if (raw.code === 'KICK') {
      return this.onKick(raw);
    }
    // functions return true if continue parsing.
    if (raw.code === '301') { // away message
      return this.onAwayMessage(raw);
    }
    if (raw.code === '307') {
      return this.onPartialUserData(raw, 'registered');
    }
    if (raw.code === '311') {
      return this.onPartialUserData(raw, 'real-name');
    }
    if (raw.code === '312') {
      return this.onPartialUserData(raw, 'server');
    }
    if (raw.code === '313') {
      return this.onPartialUserData(raw, 'is-gop');
    }
    if (raw.code === '315') {
      return this.onFinishWho(raw);
    }
    if (raw.code === '317') {
      return this.onPartialUserData(raw, 'idle-llogin');
    }
    if (raw.code === '318') {
      return this.onFinishWhois(raw);
    }
    if (raw.code === '319') { // lista de canales
      return this.onCkannelList(raw);
    }
    if (raw.code === '321') {
      return this.onStartChannelList(raw);
    }
    if (raw.code === '322') {
      return this.onChannelListNewChannel(raw);
    }
    if (raw.code === '323') {
      return this.onFinishChannelList(raw);
    }
    if (raw.code === '330') {
      return this.onPartialUserData(raw, 'user-account');
    }
    if (raw.code === '332') {
      return this.onChannelTopicChanged(raw, false);
    }
    if (raw.code === '352') { // user info (WHO response)
      return this.onWhoResponse(raw);
    }
    if (raw.code === '353') {
      return this.onCommandNamesResponse(raw);
    }
    if (raw.code === '366') {
      return this.onChannelUser(raw);
    }
    if (raw.code === '375') {
      return this.onMotd(raw);
    }
    if (raw.code === '378') {
      return this.onPartialUserData(raw, 'connected-from');
    }
    if (raw.code === '379') {
      return this.onPartialUserData(raw, 'modes');
    }
    if (raw.code === '401') {
      return this.onNonExistantNick(raw);
    }
    if (raw.code === '404') {
      return this.onChannelModerated(raw);
    }
    if (raw.code === '433') {
      return this.onNickAlreadyInUse(raw);
    }
    if (raw.code === '464') {
      return this.onUserRequirePassword(raw);
    }
    if (raw.code === '474') {
      return this.onBanned(raw);
    }
    if (raw.code === '671') {
      return this.onPartialUserData(raw, 'is-secured');
    }
    if (raw.code === '716') {
      return this.onServerSideIgnore(raw);
    }
    if (raw.code === '718') {
      return this.onRequestPMGmode(raw);
    }
    if (raw.code === 'PONG') {
      return this.onPongReceived(raw);
    }
    if (raw.code === 'QUIT') {
      return this.onQuit(raw);
    }
    return this.onUknownMessage(raw);
  }

  private static onPrivMSG(raw: RawMessage) {
    // const meMsg = MessageHandler.getMeAction(raw);
    // const message = new IndividualMessage();
    // message.author = raw.simplyOrigin;
    // if (meMsg) {
    //   message.message = meMsg[1];
    //   message.meAction = true;
    // } else {
    //   message.message = raw.content;
    //   message.meAction = false;
    // }
    // message.time = Time.getTime();
    // message.date = Time.getDateStr();
    // if (raw.target === actualNick) { // privado
    //   message.messageType = IndividualMessageTypes.PRIVMSG;
    // } else {
    //   message.messageType = IndividualMessageTypes.CHANMSG;
    //   message.channel = raw.target;
    // }
    // message.mention = message.message ? message.message.indexOf(actualNick) >= 0 : false;
    // message.mention = !message.mention ? message.message.indexOf('@all') >= 0 : true;
    // MessageHandler.onMessage(message);
  }

  private static onChannelUser(raw: RawMessage) {
    // const channel = raw.partials[3];
    // const chnlObj = new Channel(channel);
    // UsersHandler.addUsersToChannel(chnlObj.name, IRCParserV2.usersInChannel[channel]);
    // IRCParserV2.usersInChannel[channel] = [];
  }

  private static onModeCommand(raw: RawMessage) {
    // const mode = ModeHandler.modeParser(rawMessage);
    // if(mode[3]) {
    //   const nmode = new NewMode();
    //   nmode.userTarget = new User(mode[3]);
    //   nmode.channelTarget = raw.target;
    //   nmode.modeAdded = mode[1] === '+';
    //   nmode.mode = mode[2];
    //   ModeHandler.changeMode(nmode);
    // } else {
    //   const nmode = new NewMode();
    //   nmode.channelTarget = raw.target;
    //   nmode.userTarget = new User(raw.target);
    //   nmode.mode = mode[2];
    //   ModeHandler.changeMode(nmode);
    // }
  }

  private static onNickChanged(raw: RawMessage) {
    // StatusHandler.onNickChanged(
    //   new NickChange(raw.simplyOrigin, raw.target ? raw.target : raw.content)
    // );
  }

  private static onMotd(raw: RawMessage) {
    // MotdHandler.motdResponse.emit(raw);
  }

  private static onUserRequirePassword(raw: RawMessage) {
    // MotdHandler.requirePasswordResponse.emit(raw);
  }

  private static onChannelModerated(raw: RawMessage) {
    // ModeratedHandler.channelModerated.emit(raw);
  }

  private static onChannelTopicChanged(raw: RawMessage, fromTopic: boolean) {

    // from topic == false:
    // const channels = ChannelStatusHandler.findChannels(rawMessage);
    // ChannelStatusHandler.setChannelTopic(channels[0], raw.content);

    // from topic == true:
    // ChannelStatusHandler.setChannelTopic(raw.target, raw.content);

  }

  private static onServerSideIgnore(raw: RawMessage) {
    // const ignore = new Away();
    // ignore.author = raw.partials[3];
    // ignore.message = raw.content;
    // IgnoreHandler.onIgnore(ignore);
  }

  private static onNonExistantNick(raw: RawMessage) {
    // const away = new Away();
    // away.author = raw.partials[3];
    // away.message = raw.content;
    // AwayHandler.onNonExistant(away);
  }

  private static onAwayMessage(raw: RawMessage) {
    // const away = new Away();
    // away.author = raw.partials[3];
    // away.message = raw.content;
    // AwayHandler.onAway(away);
  }

  private static onBanned(raw: RawMessage) {
    // TODO: obtener canal.
    // StatusHandler.onBanned('');
    // return;
  }

  private static onNickAlreadyInUse(raw: RawMessage) {
    // TODO: obtener nick anterior.
    // StatusHandler.onNickAlreadyInUse('');
  }

  private static onCkannelList(raw: RawMessage) {
    // const chnlList = [];
    // raw.content.split(' ').forEach(pmChnl => {

    // });
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'channelList', chnlList);
    // ChannelListHandler.setChannelList(raw.partials[3], chnlList);
  }

  private static onRequestPMGmode(raw: RawMessage) {  // requiere privado cuando tenes +g
    // :avalon.hira.io 718 Tulkalex Tulkaz ~Harkito@net-j7j.cur.32.45.IP :is messaging you, and you have user mode +g set.
    // Use /ACCEPT +Tulkaz to allow.
    // GmodeHandler.privateRequest(raw.partials[3]);
  }

  private static onFinishWhois(raw: RawMessage) {
    // WhoIsHandler.finalWhoisMessage(raw.partials[3]);
  }

  private static onStartChannelList(raw: RawMessage) {
    // ListHandler.newChannelList();
  }

  private static onChannelListNewChannel(raw: RawMessage) {
    // const body = raw.body.split(']');
    // ListHandler.addChannels(new ChannelInfo(raw.partials[3].slice(1), body[1], body[0].replace('[' , ''), parseInt(raw.partials[4])));
  }

  private static onFinishChannelList(raw: RawMessage) {
    // end channel list
  }

  private static onCommandNamesResponse(raw: RawMessage) {
    // const channel = UsersHandler.getChannelOfMessage(rawMessage);
    // if(!IRCParserV2.usersInChannel[channel]) {
    //   IRCParserV2.usersInChannel[channel] = [];
    // }
    // const users = raw.content.trim().split(' ');
    // users.forEach(user => {
    //   IRCParserV2.usersInChannel[channel].push(new UserInChannel(user, channel));
    // });
  }

  private static onWhoResponse(raw: RawMessage) {
    // const data = WhoHandler.WHOUserParser(rawMessage);
    // if (data) {
    //   const whoData = new Who();
    //   whoData.serverFrom = data[7];
    //   whoData.nick = data[8];
    //   whoData.isAway = data[9] === 'G';
    //   whoData.isNetOp = data[10] === '*';
    //   whoData.rawMsg = rawMessage;
    //   const mod = data[11];
    //   if (mod === '~') {
    //     whoData.mode = UModes.FOUNDER;
    //   } else if (mod === '&') {
    //     whoData.mode = UModes.ADMIN;
    //   } else if (mod === '@') {
    //     whoData.mode = UModes.OPER;
    //   } else if (mod === '%') {
    //     whoData.mode = UModes.HALFOPER;
    //   } else if (mod === '+') {
    //     whoData.mode = UModes.VOICE;
    //   }
    //   WhoHandler.addWhoData(data[8], whoData);
    // } else {
    //   console.error('BAD WHO RESPONSE PARSED: ', rawMessage, data);
    // }
  }

  private static onFinishWho(raw: RawMessage) {
    // End of who
  }

  private static onKick(data: RawMessage) {
    // let channel = raw.target;
    // const kickData = KickHandler.kickParse(rawMessage);
    // const kickInfo = new KickInfo();
    // kickInfo.channel = new Channel(channel);
    // kickInfo.operator = raw.content;
    // kickInfo.userTarget = new User(kickData[2]);
    // KickHandler.onKick(kickInfo);
  }

  private static onQuit(data: RawMessage) {
    // QuitHandler.onQuit(new Quit(raw.simplyOrigin));
  }

  private static onJoin(data: RawMessage) {
    // const join = new Join();
    // const channel = raw.content ? raw.content : raw.target;
    // join.channel = new Channel(channel);
    // join.user = new User(raw.simplyOrigin);
    // join.origin = raw.origin;
    // JoinHandler.onJoin(join);
  }

  private static onPart(data: RawMessage) {
    // :Harko!~Harkolandia@harkonidaz.irc.tandilserver.com PART #SniferL4bs :"Leaving"
    // let channel = raw.target;
    // if (!channel) {
    //   channel = raw.content;
    // }
    // const part = new Part();
    // part.channel = new Channel(channel);
    // part.message = raw.content;
    // part.user = new User(raw.simplyOrigin);
    // PartHandler.onPart(part);
  }

  private static onNotice(data: RawMessage) {
    // if(raw.target[0] === '#') {
    //   // notice a un canal
    //   const message = new IndividualMessage();
    //   message.author = raw.simplyOrigin;
    //   message.message = raw.content;
    //   message.meAction = false;
    //   message.externalNotice = true;
    //   message.time = Time.getTime();
    //   message.date = Time.getDateStr();
    //   message.messageType = IndividualMessageTypes.CHANMSG;
    //   message.channel = raw.target;
    //   MessageHandler.onMessage(message);
    //   return;
    // } else if (raw.simplyOrigin && raw.simplyOrigin !== '*status' && raw.target[0] === '#') {
    //   // notices generales
    //   const message = new IndividualMessage();
    //   message.messageType = IndividualMessageTypes.NOTIFY;
    //   message.author = raw.simplyOrigin;
    //   message.message = raw.content;
    //   message.meAction = false;
    //   message.channel = raw.target;
    //   message.time = Time.getTime();
    //   message.date = Time.getDateStr();
    //   MessageHandler.onMessage(message);
    //   return;
    // } else {
    //   // notice
    //   ServerHandler.onServerNoticeResponse(raw);
    //   return;
    // }
  }

  private static onPartialUserData(data: RawMessage, key: string) {
    // connected-from
    // connecting from
    // :avalon.hira.io 378 Tulkalex Tulkalex :is connecting from ~Tulkalandi@167.99.172.78 167.99.172.78
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'connectedFrom', raw.body.replace('is connecting from ', ''));

    // registered
    // nick registered
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'registered', raw.body);

    // real-name
    // :hiperion.hirana.net 311 Zerpiente Zerpiente Zerpiente Hirana-8kh.svf.168.181.IP * :IRCoreV2
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'realn', raw.body);

    // server
    // server desde donde está conectado
    // :avalon.hira.io 312 Tulkalex Tulkalex avalon.hira.io :Avalon - Frankfurt, Germany
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'server', raw.body);

    // is-gop
    // :avalon.hira.io 313 Tulkalex Tulkalex :is a GlobalOp on Hira
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'isGOP', true);

    // modes
    // :avalon.hira.io 379 Tulkalex Tulkalex :is using modes +Iiow
    // const modes = raw.body.split(' ');
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'modes', modes[modes.length - 1]);

    // user-account
    // :avalon.hira.io 330 Tulkalex Tulkalex alexander1712 :is logged in as
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'userAccount', raw.partials[4]);

    // is-secured
    // :avalon.hira.io 671 Tulkalex Tulkalex :is using a secure connection
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'isSecured', true);

    // idle-llogin
    // :avalon.hira.io 317 Tulkalex Tulkalex 6318 1602266231 :seconds idle, signon time
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'idle', raw.partials[4]);
    // WhoIsHandler.addWhoisPartial(raw.partials[3], 'lastLogin', raw.partials[5]);
  }

  private static onPongReceived(raw: RawMessage) { }

  private static onUknownMessage(raw: RawMessage) {
    // ServerHandler.onServerResponse(raw);
  }

}
