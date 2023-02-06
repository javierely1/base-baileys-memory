const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2'])
    .addAnswer([
    '📄 Aquí tenemos el flujo secundario',
    ],
)

const flowMinistro = addKeyword([
    'Ministro',
    'ministro',
]).addAnswer(
    [
        '*- INFORME MENSUAL MINISTERIAL -*',
        '\n📄 Nombre Completo:',
        '📄 Nombre de su Iglesia:',
        '📄 Correo electrónico:',
        '📄 Haga un breve resumen de sus actividades miniteriales este mes:',
        '📄 Cuantas veces predicó este mes:',
        '📄 Comparta un testimonio o un evento especial reciente:',
        '📄 Comparta alguna preocupación, desafío, problema o un motivo especial de oración:',
        '📄 Meta principal para este mes:',
        '\n*------------- FINANZAS -------------*',
        '\n*Traigan todos los diezmos al depósito del templo, para que haya suficiente comida en mi casa. Si lo hacen—dice el Señor de los Ejércitos Celestiales—, les abriré las ventanas de los cielos.¡Derramaré una bendición tan grande que no tendrán suficiente espacio para guardarla! ¡Inténtenlo! ¡Pónganme a prueba! Sus cosechas serán abundantes porque las protegeré de insectos y enfermedades. Las uvas no caerán de las vides antes de madurar—dice el Señor de los Ejércitos Celestiales. Entonces todas las naciones los llamarán benditos, porque su tierra será un deleite», dice el Señor de los Ejércitos Celestiales.*',
        '\n*Malaquías 3: 10 - 12*',
        '\n📄 Cantidad de diezmos personales a enviar al Ministerio Puertas Abiertas:',
        '📄 Cantidad de ofrendas personales a enviar al Ministerio Puertas Abiertas:'
    ])
    .addAnswer([
        '\n*------¿CÓMO RESPONDER?---------*',
        '\n 1.COPIA Y PEGA EL MENSAJE DE ARRIBA EN LA CASILLA DONDE ESCRIBES',
        '2.AGREGA TUS REPUESTAS A CADA PREGUNTA DESPUÉS DE LOS DOS PUNTOS ":"',
        '3.DALE CLICK A ENVIAR',
        '4.FELICIDADES HAZ COMPLETADO TU INFORME MENSUAL 🎉 🥳 👏🏻',
        'Gracias 🙏🏻',
        '\n\n👉 Responde *Menu* para volver al menu principal.'])

const flowIglesia = addKeyword(['Iglesia', 'iglesia']).addAnswer(
    [
        '*-INFORME ESTADISTICO DE LA IGLESIA-*',
        '\n📄 Nombre de la Iglesia:',
        '📄 Cantidad de miembros:',
        '📄 Cantidad de salvaciones:',
        '📄 Número de Bautismos en Agua:',
        '📄 Número de Bautismos en el Espíritu Santo',
        '📄 Número de niños y adolescentes:',
        '📄 Número de jóvenes:',
        '📄 Número de mujéres:',
        '📄 Número de hombres:',
        '📄 Número de ancianos:',
        '📄 Número de células que atiende su iglesia y cuantas personas en cada célula:',
        '\n*------------- FINANZAS -------------*',
        '\n📄 Cantidad total de ingresos:',
        '📄 Cantidad total de egresos:',
        '📄 Cantidad en el fondo financiero de la iglesia:',
        '📄 Cantidad de diezmos a enviar al Ministerio Puertas Abiertas:',
        '📄 Cantidad de ofrendas a enviar al Ministerio Puertas Abiertas:'])
    .addAnswer(['\n*------¿CÓMO RESPONDER?---------*',
        '\n 1.COPIA Y PEGA ESTE MENSAJE EN LA CASILLA DONDE ESCRIBES',
        '2.AGREGA TUS REPUESTAS A CADA PREGUNTA DESPUÉS DE LOS DOS PUNTOS ":"',
        '3.DALE CLICK A ENVIAR',
        '4.FELICIDADES HAZ COMPLETADO TU INFORME MENSUAL 🎉 🥳 👏🏻',
        'Gracias 🙏🏻',
        '\n\n👉 Responde *Menu* para volver al menu principal.'])

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'Gracias por tu sacrificio y tu trabajo en la obra del señor. Bendiciones 🙏🏻',
    ],
    null,
    null,
    [flowSecundario]
)

const flowAyuda= addKeyword(['ayuda']).addAnswer(
    [
        'Por favor describa la ayuda que necesita y lo contactaremos lo antes posible.',
        '\n\n👉 Responde *Menu* para volver al menu principal.',
    ])

const flowPrincipal = addKeyword(['hola', 'buenas','menu'])
    .addAnswer('🙌 Hola bienvenido al *Ministerio Puertas Abiertas* 💒')
    .addAnswer(
        [
            'Le compartimos  las siguientes opciones:',
            '👉 Responde "*Ministro*" para llenar su informe mensual ministerial',
            '👉 Responde "*Iglesia*"  para llenar el informe mensual de su iglesia local',
            '👉 Responde "*Ayuda*" para solicitar asistencia',
        ],
        null,
        null,
        [flowMinistro, flowGracias, flowIglesia, flowAyuda]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
