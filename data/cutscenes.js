/**
 * Cutscenes Data - Definizione di tutte le cutscene del gioco
 * Ogni cutscene può avere più slide e può collegare a una sfida specifica
 */

const cutsceneData = {
    "intro_cutscene": { 
        "title": "Il Richiamo del Raid", 
        "slides": [ 
            { 
                "narrative": "La nebbia del mattino si alza dal fiordo. Il capo clan annuncia il prossimo raid: le coste sassoni, ricche di tesori. È il momento di colpire.\n\nImpugni la tua ascia, il sangue degli antenati che ribolle. Le navi sono pronte, l'equipaggio è ansioso di gloria. Il vento del nord ulula tra le vele, portando promesse di ricchezza.", 
                "image": "viking_ship.png" 
            }, 
            { 
                "narrative": "Dopo giorni in mare, avvisti la costa. Un villaggio fortificato si staglia all'orizzonte. I tuoi compagni affilano le asce. Il grido di battaglia ti sale in gola. È ora di dimostrare il tuo valore.", 
                "image": "saxon_village.png" 
            }, 
            { 
                "narrative": "La nave si arena sulla spiaggia. I difensori hanno suonato l'allarme, ma tu hai un piano: infiltrarti di notte. La porta principale è sbarrata. Dovrai usare la tua abilità per aprirla in silenzio. Ogni rumore potrebbe allertare le guardie.", 
                "image": "locked_gate.png" 
            } 
        ], 
        "nextChallengeId": "scasso_challenge" 
    },

    "success_cutscene": { 
        "title": "Primo Successo", 
        "slides": [ 
            { 
                "narrative": "La serratura cede con un click soddisfacente. Ti intrufoli nel villaggio, l'ombra della notte ti protegge. Ma un guerriero sassone emerge dall'oscurità, la spada già sguainata.", 
                "image": "night_infiltration.png" 
            }, 
            { 
                "narrative": "\"Guerriero del Nord!\" grida. \"Se vuoi il nostro oro, dovrai dimostrare di essere degno! Sfidami in una prova di forza, come vuole l'onore dei combattenti!\"\n\nNon puoi rifiutare. L'onore vichingo ti impone di accettare la sfida. Sarà una prova di resistenza e precisione.", 
                "image": "saxon_warrior.png" 
            } 
        ], 
        "nextChallengeId": "accumulator_challenge" 
    },

    "second_cutscene": { 
        "title": "Il Vero Nemico", 
        "slides": [ 
            { 
                "narrative": "Il guerriero sassone crolla, sconfitto dalla tua superiorità. Avanzi verso il tesoro, ma una figura incappucciata emerge dalle tenebre. È l'assassino del villaggio, famoso per la sua letale precisione.", 
                "image": "mysterious_assassin.png" 
            }, 
            { 
                "narrative": "\"Molti guerrieri sono venuti qui per il tesoro,\" sussurra con voce gelida. \"Tutti sono morti per mano mia. Tu sarai l'ultimo.\"\n\nQuesto nemico è diverso dagli altri. Non ci sarà una seconda possibilità. Un solo errore significherà la morte. Preparati alla sfida più letale della tua vita.", 
                "image": "final_confrontation.png" 
            } 
        ], 
        "nextChallengeId": "sudden_death_challenge" 
    },

    "assassin_victory_cutscene": {
        "title": "Vittoria sull'Assassino", 
        "slides": [ 
            { 
                "narrative": "L'assassino crolla, sconfitto dalla tua precisione mortale. La sua figura incappucciata cade a terra senza un suono. Per un momento, regna il silenzio più totale nel villaggio.", 
                "image": "assassin_defeated.png" 
            },
            { 
                "narrative": "Ma la tua vittoria ha attirato l'attenzione. Un nuovo sfidante emerge dalle ombre: un arciere sassone, noto per la sua abilità micidiale. 'Hai dimostrato di essere degno,' dice, tendendo l'arco. 'Ma ora affronterai la vera prova del destino!'", 
                "image": "archer_appears.png" 
            } 
        ], 
        "nextChallengeId": "hit_or_miss_challenge" 
    },

    "archer_success_cutscene": {
        "title": "Il Colpo Perfetto", 
        "slides": [ 
            { 
                "narrative": "Il colpo va a segno con precisione chirurgica! L'arciere sassone cade, colpito dalla tua abilità leggendaria. Ma la vittoria è amara: il rumore ha allertato le guardie del villaggio.", 
                "image": "perfect_shot.png" 
            },
            { 
                "narrative": "Due guerrieri sassone emergono dalle tenebre, brandendo pesanti asce da guerra. 'Il nostro arciere migliore è caduto,' ringhiano. 'Ma noi siamo ancora qui. Dovrai affrontarci entrambi contemporaneamente se vuoi il tesoro!'", 
                "image": "twin_warriors.png" 
            } 
        ], 
        "nextChallengeId": "double_bar_challenge" 
    },

    "victory_cutscene": {
        "title": "Trionfo Totale", 
        "slides": [ 
            { 
                "narrative": "L'assassino crolla, sconfitto dalla tua precisione mortale. Il tesoro è tuo! Casse piene d'oro, gioielli preziosi e armi leggendarie ora appartengono al tuo clan.\n\nI tuoi compagni vichinghi gridano il tuo nome. Tornerai in patria come un eroe, le tue gesta saranno cantate per generazioni. Odino stesso sorride dal Valhalla!", 
                "image": "treasure_victory.png" 
            } 
        ], 
        "nextChallengeId": null 
    },

    "defeat_cutscene": { 
        "title": "Morte Onorevole", 
        "slides": [ 
            { 
                "narrative": "Le tue forze ti abbandonano. Il nemico ha prevalso, ma hai combattuto con onore vichingo. Le Valchirie scendono dai cieli per portarti nel Valhalla.\n\nLa tua morte non è stata vana: altri guerrieri verranno dopo di te, ispirati dal tuo coraggio. Le saghe ricorderanno il tuo nome tra gli eroi caduti.", 
                "image": "valhalla_death.png" 
            } 
        ], 
        "nextChallengeId": null 
    }
};