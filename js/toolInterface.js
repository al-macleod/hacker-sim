export class ToolInterface {
  constructor(terminal) {
    this.terminal = terminal;
    this.asciiArt = {
      nmap: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║    ███╗   ██╗███╗   ███╗ █████╗ ████████╗    ██╗   ██╗ ██████╗    ██╗██╗    ║
║    ████╗  ██║████╗ ████║██╔══██╗╚══██╔══╝    ██║   ██║██╔═══██╗  ███║██║    ║
║    ██╔██╗ ██║██╔████╔██║███████║   ██║       ██║   ██║██║   ██║  ╚██║██║    ║
║    ██║╚██╗██║██║╚██╔╝██║██╔══██║   ██║       ╚██╗ ██╔╝██║   ██║   ██║╚═╝    ║
║    ██║ ╚████║██║ ╚═╝ ██║██║  ██║   ██║        ╚████╔╝ ╚██████╔╝   ██║██╗    ║
║    ╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝         ╚═══╝   ╚═════╝    ╚═╝╚═╝    ║
║                                                                               ║
║                    Network Mapper - The Network Discovery Tool               ║
║                           https://nmap.org - Version 7.94                    ║
║                                                                               ║
║    Usage: nmap [Scan Type(s)] [Options] {target specification}               ║
║                                                                               ║
║    TARGET SPECIFICATION:                                                      ║
║      Can pass hostnames, IP addresses, networks, etc.                        ║
║      Ex: scanme.nmap.org, microsoft.com/24, 192.168.1.1; 10.0.0-255.1-254   ║
║                                                                               ║
║    SCAN TECHNIQUES:                                                           ║
║      -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans              ║
║      -sU: UDP Scan                                                            ║
║      -sN/sF/sX: TCP Null, FIN, and Xmas scans                               ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

      msfconsole: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║    ███╗   ███╗███████╗████████╗ █████╗ ███████╗██████╗ ██╗      ██████╗ ██╗████████╗║
║    ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗██║╚══██╔══╝║
║    ██╔████╔██║█████╗     ██║   ███████║███████╗██████╔╝██║     ██║   ██║██║   ██║   ║
║    ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║╚════██║██╔═══╝ ██║     ██║   ██║██║   ██║   ║
║    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║███████║██║     ███████╗╚██████╔╝██║   ██║   ║
║    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝ ╚═════╝ ╚═╝   ╚═╝   ║
║                                                                               ║
║                        =[ metasploit v6.3.31-dev                            ║
║    + -- --=[ 2328 exploits - 1218 auxiliary - 413 post                      ║
║    + -- --=[ 1385 payloads - 46 encoders - 11 nops                          ║
║    + -- --=[ 9 evasion                                                       ║
║                                                                               ║
║    Metasploit tip: Use the edit command to open the currently active         ║
║                   module in your editor                                      ║
║                                                                               ║
║    msf6 >                                                                     ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

      hashcat: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║    ██╗  ██╗ █████╗ ███████╗██╗  ██╗ ██████╗ █████╗ ████████╗                ║
║    ██║  ██║██╔══██╗██╔════╝██║  ██║██╔════╝██╔══██╗╚══██╔══╝                ║
║    ███████║███████║███████╗███████║██║     ███████║   ██║                   ║
║    ██╔══██║██╔══██║╚════██║██╔══██║██║     ██╔══██║   ██║                   ║
║    ██║  ██║██║  ██║███████║██║  ██║╚██████╗██║  ██║   ██║                   ║
║    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝                   ║
║                                                                               ║
║                    hashcat (v6.2.6) starting in benchmark mode...           ║
║                                                                               ║
║    * Device #1: NVIDIA GeForce RTX 4090, 24564/24564 MB, 128MCU             ║
║    * Device #2: NVIDIA GeForce RTX 4090, 24564/24564 MB, 128MCU             ║
║                                                                               ║
║    Benchmark relevant options:                                               ║
║    ===========================                                               ║
║    * --optimized-kernel-enable                                               ║
║                                                                               ║
║    Hashmode: 0 - MD5                                                         ║
║                                                                               ║
║    Speed.#1.........: 63421.4 MH/s (49.87ms) @ Accel:512 Loops:1024        ║
║    Speed.#2.........: 63421.4 MH/s (49.87ms) @ Accel:512 Loops:1024        ║
║    Speed.#*.........: 126842.8 MH/s                                         ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

      setoolkit: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║     ███████╗███████╗████████╗ ██████╗  ██████╗ ██╗     ██╗  ██╗██╗████████╗  ║
║     ██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██║ ██╔╝██║╚══██╔══╝  ║
║     ███████╗█████╗     ██║   ██║   ██║██║   ██║██║     █████╔╝ ██║   ██║     ║
║     ╚════██║██╔══╝     ██║   ██║   ██║██║   ██║██║     ██╔═██╗ ██║   ██║     ║
║     ███████║███████╗   ██║   ╚██████╔╝╚██████╔╝███████╗██║  ██╗██║   ██║     ║
║     ╚══════╝╚══════╝   ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝     ║
║                                                                               ║
║                    [---]        The Social-Engineer Toolkit (SET)     [---]  ║
║                    [---]        Created by: David Kennedy (ReL1K)     [---]  ║
║                    [---]                Version: 8.0.3               [---]  ║
║                    [---]              Codename: 'Maverick'           [---]  ║
║                    [---]        Follow us on Twitter: @TrustedSec     [---]  ║
║                    [---]        Follow me on Twitter: @HackingDave    [---]  ║
║                    [---]       Homepage: https://www.trustedsec.com   [---]  ║
║                                                                               ║
║     Welcome to the Social-Engineer Toolkit (SET).                            ║
║     The one stop shop for all of your SE needs.                              ║
║                                                                               ║
║     The Social-Engineer Toolkit is a product of TrustedSec.                  ║
║                                                                               ║
║     Visit: https://www.trustedsec.com                                        ║
║                                                                               ║
║     Select from the menu:                                                     ║
║                                                                               ║
║        1) Social-Engineering Attacks                                         ║
║        2) Penetration Testing (Fast-Track)                                   ║
║        3) Third Party Modules                                                ║
║        4) Update the Social-Engineer Toolkit                                 ║
║        5) Update SET configuration                                           ║
║        6) Help, Credits, and About                                           ║
║                                                                               ║
║       99) Exit the Social-Engineer Toolkit                                   ║
║                                                                               ║
║    set>                                                                       ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

      burp: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║    ██████╗ ██╗   ██╗██████╗ ██████╗     ███████╗██╗   ██╗██╗████████╗███████╗ ║
║    ██╔══██╗██║   ██║██╔══██╗██╔══██╗    ██╔════╝██║   ██║██║╚══██╔══╝██╔════╝ ║
║    ██████╔╝██║   ██║██████╔╝██████╔╝    ███████╗██║   ██║██║   ██║   █████╗   ║
║    ██╔══██╗██║   ██║██╔══██╗██╔═══╝     ╚════██║██║   ██║██║   ██║   ██╔══╝   ║
║    ██████╔╝╚██████╔╝██║  ██║██║         ███████║╚██████╔╝██║   ██║   ███████╗ ║
║    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝         ╚══════╝ ╚═════╝ ╚═╝   ╚═╝   ╚══════╝ ║
║                                                                               ║
║                           Professional Web Security Testing                  ║
║                                  Version 2023.10.3.4                        ║
║                                                                               ║
║    PortSwigger Web Security                                                   ║
║    Copyright 2023 PortSwigger Ltd. All rights reserved.                      ║
║                                                                               ║
║    See https://portswigger.net/burp/documentation for help and guidance      ║
║                                                                               ║
║    Burp Suite Professional loaded successfully                               ║
║    Proxy listener started on 127.0.0.1:8080                                 ║
║    Scanner engine initialized                                                 ║
║    Extensions loaded: 47 BApps available                                     ║
║                                                                               ║
║    Ready for web application security testing...                             ║
║                                                                               ║
║    [Target] [Proxy] [Scanner] [Intruder] [Repeater] [Sequencer] [Decoder]   ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

      sqlmap: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║     ███████╗ ██████╗ ██╗     ███╗   ███╗ █████╗ ██████╗                      ║
║     ██╔════╝██╔═══██╗██║     ████╗ ████║██╔══██╗██╔══██╗                     ║
║     ███████╗██║   ██║██║     ██╔████╔██║███████║██████╔╝                     ║
║     ╚════██║██║▄▄ ██║██║     ██║╚██╔╝██║██╔══██║██╔═══╝                      ║
║     ███████║╚██████╔╝███████╗██║ ╚═╝ ██║██║  ██║██║                          ║
║     ╚══════╝ ╚══▀▀═╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝                          ║
║                                                                               ║
║            sqlmap/1.7.11#stable (http://sqlmap.org)                          ║
║                                                                               ║
║    [!] legal disclaimer: Usage of sqlmap for attacking targets without       ║
║        prior mutual consent is illegal. It is the end user's                 ║
║        responsibility to obey all applicable local, state and federal laws.  ║
║        Developers assume no liability and are not responsible for any         ║
║        misuse or damage caused by this program                               ║
║                                                                               ║
║    [*] starting @ 15:42:33 /2024-01-15/                                      ║
║                                                                               ║
║    Usage: python sqlmap.py [options]                                         ║
║                                                                               ║
║    Options:                                                                   ║
║      -h, --help            Show basic help message and exit                  ║
║      -hh                   Show advanced help message and exit               ║
║      --version             Show program's version number and exit            ║
║      -v VERBOSE            Verbosity level: 0-6 (default 1)                 ║
║                                                                               ║
║    Target:                                                                    ║
║      At least one of these options has to be provided to define the target(s)║
║                                                                               ║
║      -u URL, --url=URL     Target URL (e.g. "http://www.site.com/vuln.php?id=1")║
║      -d DIRECT             Connection string for direct database connection  ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

      john: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║         ██╗ ██████╗ ██╗  ██╗███╗   ██╗    ████████╗██╗  ██╗███████╗          ║
║         ██║██╔═══██╗██║  ██║████╗  ██║    ╚══██╔══╝██║  ██║██╔════╝          ║
║         ██║██║   ██║███████║██╔██╗ ██║       ██║   ███████║█████╗            ║
║    ██   ██║██║   ██║██╔══██║██║╚██╗██║       ██║   ██╔══██║██╔══╝            ║
║    ╚█████╔╝╚██████╔╝██║  ██║██║ ╚████║       ██║   ██║  ██║███████╗          ║
║     ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝       ╚═╝   ╚═╝  ╚═╝╚══════╝          ║
║                                                                               ║
║                            ██████╗ ██╗██████╗ ██████╗ ███████╗██████╗        ║
║                            ██╔══██╗██║██╔══██╗██╔══██╗██╔════╝██╔══██╗       ║
║                            ██████╔╝██║██████╔╝██████╔╝█████╗  ██████╔╝       ║
║                            ██╔══██╗██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗       ║
║                            ██║  ██║██║██║     ██║     ███████╗██║  ██║       ║
║                            ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝       ║
║                                                                               ║
║                    John the Ripper 1.9.0-jumbo-1 (Linux x86_64)             ║
║                    Copyright (c) 1996-2021 by Solar Designer and others      ║
║                    Homepage: https://www.openwall.com/john/                  ║
║                                                                               ║
║    Usage: john [OPTIONS] [PASSWORD-FILES]                                    ║
║                                                                               ║
║    --single[=SECTION]        "single crack" mode                             ║
║    --wordlist[=FILE] --stdin wordlist mode, read words from FILE or stdin   ║
║    --rules[=SECTION]         enable word mangling rules for wordlist modes  ║
║    --incremental[=MODE]      "incremental" mode [using section MODE]        ║
║    --mask=MASK               mask mode using MASK                            ║
║    --markov[=OPTIONS]        "Markov" mode (see doc/MARKOV)                 ║
║    --external=MODE           external mode or word filter                    ║
║    --stdout[=LENGTH]         just output candidate passwords [cut at LENGTH]║
║    --restore[=NAME]          restore an interrupted session [called NAME]   ║
║    --session=NAME            give a new session the NAME                     ║
║    --status[=NAME]           print status of a session [called NAME]        ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`
    };
  }

  showToolSplash(toolName) {
    const art = this.asciiArt[toolName];
    if (art) {
      this.terminal.writeLine('', 'normal');
      art.split('\n').forEach(line => {
        this.terminal.writeLine(line, 'info');
      });
      this.terminal.writeLine('', 'normal');
      this.terminal.writeLine(`${toolName.toUpperCase()} loaded successfully. Type 'help' for commands or 'exit' to return.`, 'success');
      this.terminal.writeLine('', 'normal');
    }
  }

  executeToolCommand(toolName, command, args, player) {
    switch (toolName) {
      case 'nmap':
        return this.executeNmap(command, args, player);
      case 'msfconsole':
        return this.executeMetasploit(command, args, player);
      case 'hashcat':
        return this.executeHashcat(command, args, player);
      case 'setoolkit':
        return this.executeSetoolkit(command, args, player);
      case 'burp':
        return this.executeBurp(command, args, player);
      case 'sqlmap':
        return this.executeSqlmap(command, args, player);
      case 'john':
        return this.executeJohn(command, args, player);
      default:
        return { success: false, message: `Tool ${toolName} not implemented yet.` };
    }
  }

  executeNmap(command, args, player) {
    const target = args[0] || '192.168.1.1';
    const scanType = args[1] || '-sS';
    
    const effectiveness = player.getSkillLevel('network_scanning') * 20;
    const success = Math.random() < (0.7 + effectiveness / 100);
    
    if (!success) {
      return { success: false, message: `Nmap scan failed - target ${target} may be protected by firewall` };
    }

    const ports = this.generateNmapResults(target, scanType, effectiveness);
    player.addXP(30 + effectiveness);
    player.addBTC(0.0005 + (effectiveness / 10000));
    
    return {
      success: true,
      message: `Nmap scan results for ${target}:\n\n${ports}`,
      reward: { xp: 30 + effectiveness, btc: 0.0005 + (effectiveness / 10000) }
    };
  }

  executeMetasploit(command, args, player) {
    if (command === 'search') {
      const searchTerm = args[0] || 'windows';
      return {
        success: true,
        message: `Matching Modules:\n\n   #  Name                                      Disclosure Date  Rank    Check  Description\n   -  ----                                      ---------------  ----    -----  -----------\n   0  exploit/windows/smb/ms17_010_eternalblue  2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption\n   1  exploit/windows/smb/ms08_067_netapi       2008-10-28       great    Yes    MS08-067 Microsoft Server Service Relative Path Stack Corruption\n   2  exploit/windows/http/iis_webdav_scstoragepathfromurl  2017-03-26  manual   Yes    Microsoft IIS WebDAV ScStoragePathFromUrl Overflow`
      };
    } else if (command === 'use') {
      const exploit = args[0] || 'exploit/windows/smb/ms17_010_eternalblue';
      return {
        success: true,
        message: `Using exploit: ${exploit}\nmsf6 exploit(${exploit.split('/').pop()}) >`
      };
    } else if (command === 'exploit' || command === 'run') {
      const effectiveness = player.getSkillLevel('malware_analysis') * 15;
      const success = Math.random() < (0.6 + effectiveness / 100);
      
      if (success) {
        player.addXP(150 + effectiveness);
        player.addBTC(0.005 + (effectiveness / 5000));
        return {
          success: true,
          message: `[*] Started reverse TCP handler on 192.168.1.100:4444\n[*] Sending stage (175174 bytes) to 192.168.1.50\n[*] Meterpreter session 1 opened\n\nmeterpreter > `,
          reward: { xp: 150 + effectiveness, btc: 0.005 + (effectiveness / 5000) }
        };
      } else {
        return { success: false, message: `[-] Exploit failed: target appears to be patched or protected` };
      }
    }
    
    return { success: true, message: `msf6 > ` };
  }

  executeHashcat(command, args, player) {
    const hashFile = args[0] || 'hashes.txt';
    const attackMode = args[1] || '0';
    const wordlist = args[2] || 'rockyou.txt';
    
    const effectiveness = player.getSkillLevel('hash_cracking') * 25;
    const crackedCount = Math.floor((effectiveness / 100) * 1000) + Math.floor(Math.random() * 500);
    
    player.addXP(80 + effectiveness);
    player.addBTC(crackedCount * 0.00001);
    
    return {
      success: true,
      message: `hashcat (v6.2.6) starting...\n\n* Device #1: NVIDIA GeForce RTX 4090, 24564/24564 MB\n\nHashmode: ${attackMode === '0' ? 'MD5' : attackMode === '1000' ? 'NTLM' : 'SHA1'}\n\nDictionary cache built:\n* Filename..: ${wordlist}\n* Passwords.: 14344391\n* Bytes.....: 139921497\n* Keyspace..: 14344384\n\n[s]tatus [p]ause [b]ypass [c]heckpoint [q]uit => \n\nCracked ${crackedCount} hashes in ${Math.floor(Math.random() * 300) + 60} seconds\n\nSession..........: hashcat\nStatus...........: Exhausted\nHash.Name........: ${attackMode === '0' ? 'MD5' : 'NTLM'}\nHash.Target......: ${hashFile}\nTime.Started.....: Mon Jan 15 15:42:33 2024\nTime.Estimated...: Mon Jan 15 15:47:15 2024\nGuess.Base.......: File (${wordlist})\nSpeed.#1.........: 63421.4 MH/s\nRecovered........: ${crackedCount}/5000 (${((crackedCount/5000)*100).toFixed(1)}%) Digests\nProgress.........: 14344384/14344384 (100.00%)\nRejected.........: 0/14344384 (0.00%)\nRestore.Point....: 14344384/14344384 (100.00%)\nRestore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1\nCandidates.#1....: $HEX[206b72756c6573] -> $HEX[042a0337c2a156616d6f732103c2a15616d6f732103c2a15616d6f732103c2a15616d6f732103c2a15616d6f732103c2a15616d6f73]`,
      reward: { xp: 80 + effectiveness, btc: crackedCount * 0.00001 }
    };
  }

  executeSetoolkit(command, args, player) {
    if (command === '1' || command === 'social') {
      return {
        success: true,
        message: `Social-Engineering Attacks:\n\n   1) Spear-Phishing Attack Vectors\n   2) Website Attack Vectors\n   3) Infectious Media Generator\n   4) Create a Payload and Listener\n   5) Mass Mailer Attack\n   6) Arduino-Based Attack Vector\n   7) Wireless Access Point Attack Vector\n   8) QRCode Generator Attack Vector\n   9) Powershell Attack Vectors\n  10) Third Party Modules\n\n  99) Return back to the main menu.\n\nset:phishing>`
      };
    } else if (command === '2' || command === 'website') {
      const effectiveness = player.getSkillLevel('social_engineering') * 20;
      const success = Math.random() < (0.8 + effectiveness / 100);
      
      if (success) {
        const victims = Math.floor((effectiveness / 100) * 50) + Math.floor(Math.random() * 25);
        player.addXP(100 + effectiveness);
        player.addBTC(victims * 0.0002);
        
        return {
          success: true,
          message: `Website Attack Vectors:\n\n   1) Java Applet Attack Method\n   2) Metasploit Browser Exploit Method\n   3) Credential Harvester Attack Method\n   4) Tabnabbing Attack Method\n   5) Web Jacking Attack Method\n   6) Multi-Attack Web Method\n   7) HTA Attack Method\n\nCredential harvester deployed successfully!\nListening on port 80...\n\n[*] Captured credentials from ${victims} victims\n[*] Credentials saved to harvested_creds.txt`,
          reward: { xp: 100 + effectiveness, btc: victims * 0.0002 }
        };
      } else {
        return { success: false, message: `Website attack failed - targets were suspicious of phishing attempt` };
      }
    }
    
    return { success: true, message: `set> ` };
  }

  executeBurp(command, args, player) {
    const target = args[0] || 'http://testphp.vulnweb.com';
    const effectiveness = player.getSkillLevel('web_recon') * 15;
    
    if (command === 'scan' || command === 'spider') {
      const vulnCount = Math.floor((effectiveness / 100) * 20) + Math.floor(Math.random() * 10);
      player.addXP(60 + effectiveness);
      player.addBTC(0.001 + (effectiveness / 8000));
      
      return {
        success: true,
        message: `Burp Suite Professional - Active Scan Results\n\nTarget: ${target}\nScan started: ${new Date().toLocaleString()}\n\nVulnerabilities found: ${vulnCount}\n\nHigh severity:\n• SQL injection in /search.php?q=\n• Cross-site scripting (reflected) in /comment.php\n• Directory traversal in /download.php\n\nMedium severity:\n• Missing security headers\n• Weak session token generation\n• Information disclosure in error messages\n\nLow severity:\n• Clickjacking vulnerability\n• Autocomplete enabled on password fields\n\nScan completed successfully. Full report saved to burp_scan_${Date.now()}.html`,
        reward: { xp: 60 + effectiveness, btc: 0.001 + (effectiveness / 8000) }
      };
    }
    
    return { success: true, message: `Burp Suite Professional ready. Use 'scan <target>' to begin security testing.` };
  }

  executeSqlmap(command, args, player) {
    const target = args[0] || 'http://testphp.vulnweb.com/artists.php?artist=1';
    const effectiveness = player.getSkillLevel('sql_injection') * 18;
    const success = Math.random() < (0.75 + effectiveness / 100);
    
    if (!success) {
      return { success: false, message: `sqlmap identified the following injection point(s) with a total of 0 HTTP(s) requests:\nPlace: GET\nParameter: artist\n    Type: boolean-based blind\n    Title: AND boolean-based blind - WHERE or HAVING clause\n    Payload: artist=1 AND 1=2\n\n[CRITICAL] unable to connect to the target URL. sqlmap is going to retry the request(s)` };
    }

    const dbCount = Math.floor((effectiveness / 100) * 10) + 1;
    const recordCount = Math.floor((effectiveness / 100) * 10000) + Math.floor(Math.random() * 5000);
    
    player.addXP(120 + effectiveness);
    player.addBTC(0.003 + (effectiveness / 6000));
    
    return {
      success: true,
      message: `sqlmap identified the following injection point(s) with a total of 47 HTTP(s) requests:\n---\nPlace: GET\nParameter: artist\n    Type: boolean-based blind\n    Title: AND boolean-based blind - WHERE or HAVING clause\n    Payload: artist=1 AND 5849=5849\n\n    Type: time-based blind\n    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)\n    Payload: artist=1 AND (SELECT 3875 FROM (SELECT(SLEEP(5)))UBQV)\n\n    Type: UNION query\n    Title: Generic UNION query (NULL) - 3 columns\n    Payload: artist=1 UNION ALL SELECT NULL,CONCAT(0x7176786271,0x4a6b7a4d6e4c4f4a6d4f4b,0x7162786271),NULL-- -\n---\n\navailable databases [${dbCount}]:\n[*] information_schema\n[*] mysql\n[*] performance_schema\n[*] acuart\n\nDatabase: acuart\n[8 tables]\n+----------+\n| artists  |\n| carts    |\n| categ    |\n| featured |\n| guestbook|\n| pictures |\n| products |\n| users    |\n+----------+\n\nDatabase: acuart\nTable: users\n[${recordCount} entries]\n+----+----------+----------+\n| id | username | password |\n+----+----------+----------+\n| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 |\n| 2  | test     | 098f6bcd4621d373cade4e832627b4f6 |\n+----+----------+----------+\n\n[INFO] fetched data logged to textfiles under '/home/user/.local/share/sqlmap/output/${target.split('/')[2]}'`,
      reward: { xp: 120 + effectiveness, btc: 0.003 + (effectiveness / 6000) }
    };
  }

  executeJohn(command, args, player) {
    const hashFile = args[0] || 'shadow.txt';
    const wordlist = args[1] || 'rockyou.txt';
    const effectiveness = player.getSkillLevel('hash_cracking') * 20;
    
    const crackedCount = Math.floor((effectiveness / 100) * 100) + Math.floor(Math.random() * 50);
    player.addXP(70 + effectiveness);
    player.addBTC(crackedCount * 0.00005);
    
    return {
      success: true,
      message: `Loaded ${Math.floor(Math.random() * 500) + 100} password hashes with ${Math.floor(Math.random() * 50) + 10} different salts (crypt, crypt MD5 [MD5 32/64])\nCost 1 (MD5) is 1000 for all loaded hashes\nWill run 8 OpenMP threads\nPress 'q' or Ctrl-C to abort, almost any other key for status\n${crackedCount}g 0:00:0${Math.floor(Math.random() * 9) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} DONE (2024-01-15 15:42) ${(crackedCount * 2.5).toFixed(1)}g/s ${(crackedCount * 150).toFixed(0)}p/s ${(crackedCount * 150).toFixed(0)}c/s ${(crackedCount * 150).toFixed(0)}C/s 123456..iloveyou\nUse the "--show" option to display all of the cracked passwords reliably\nSession completed\n\nCracked passwords:\nadmin:password123\nuser1:qwerty\ntest:123456\nroot:toor\nguest:guest\n\nTotal cracked: ${crackedCount} passwords`,
      reward: { xp: 70 + effectiveness, btc: crackedCount * 0.00005 }
    };
  }

  generateNmapResults(target, scanType, effectiveness) {
    const commonPorts = [21, 22, 23, 25, 53, 80, 110, 135, 139, 143, 443, 445, 993, 995, 1433, 3306, 3389, 5432, 5900, 8080];
    const maxPorts = Math.min(Math.floor(effectiveness / 5) + 5, commonPorts.length);
    const openPorts = commonPorts.slice(0, maxPorts);
    
    let result = `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleString()}\n`;
    result += `Nmap scan report for ${target}\n`;
    result += `Host is up (0.00${Math.floor(Math.random() * 99) + 10}s latency).\n\n`;
    result += `PORT     STATE SERVICE    VERSION\n`;
    
    openPorts.forEach(port => {
      const service = this.getServiceInfo(port);
      const state = Math.random() > 0.2 ? 'open' : 'filtered';
      result += `${port}/tcp  ${state.padEnd(8)} ${service.name.padEnd(10)} ${service.version}\n`;
    });
    
    result += `\nNmap done: 1 IP address (1 host up) scanned in ${Math.floor(Math.random() * 30) + 10}.${Math.floor(Math.random() * 99)} seconds`;
    
    return result;
  }

  getServiceInfo(port) {
    const services = {
      21: { name: 'ftp', version: 'vsftpd 3.0.3' },
      22: { name: 'ssh', version: 'OpenSSH 8.2p1 Ubuntu 4ubuntu0.5' },
      23: { name: 'telnet', version: 'Linux telnetd' },
      25: { name: 'smtp', version: 'Postfix smtpd' },
      53: { name: 'domain', version: 'ISC BIND 9.16.1' },
      80: { name: 'http', version: 'Apache httpd 2.4.41' },
      110: { name: 'pop3', version: 'Dovecot pop3d' },
      135: { name: 'msrpc', version: 'Microsoft Windows RPC' },
      139: { name: 'netbios-ssn', version: 'Microsoft Windows netbios-ssn' },
      143: { name: 'imap', version: 'Dovecot imapd' },
      443: { name: 'https', version: 'Apache httpd 2.4.41 (SSL)' },
      445: { name: 'microsoft-ds', version: 'Windows Server 2019 Standard' },
      993: { name: 'imaps', version: 'Dovecot imapd (SSL)' },
      995: { name: 'pop3s', version: 'Dovecot pop3d (SSL)' },
      1433: { name: 'ms-sql-s', version: 'Microsoft SQL Server 2019' },
      3306: { name: 'mysql', version: 'MySQL 8.0.28-0ubuntu0.20.04.3' },
      3389: { name: 'ms-wbt-server', version: 'Microsoft Terminal Services' },
      5432: { name: 'postgresql', version: 'PostgreSQL DB 13.7' },
      5900: { name: 'vnc', version: 'VNC (protocol 3.8)' },
      8080: { name: 'http-proxy', version: 'Jetty 9.4.z-SNAPSHOT' }
    };
    
    return services[port] || { name: 'unknown', version: 'unknown' };
  }
}