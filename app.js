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
    '馃搫 Aqu铆 tenemos el flujo secundario',
    ],
)

const flowMinistro = addKeyword([
    'Ministro',
    'ministro',
]).addAnswer(
    [
        '*- INFORME MENSUAL MINISTERIAL -*',
        '\n馃搫 Nombre Completo:',
        '馃搫 Nombre de su Iglesia:',
        '馃搫 Correo electr贸nico:',
        '馃搫 Haga un breve resumen de sus actividades miniteriales este mes:',
        '馃搫 Cuantas veces predic贸 este mes:',
        '馃搫 Comparta un testimonio o un evento especial reciente:',
        '馃搫 Comparta alguna preocupaci贸n, desaf铆o, problema o un motivo especial de oraci贸n:',
        '馃搫 Meta principal para este mes:',
        '\n*------------- FINANZAS -------------*',
        '\n*Traigan todos los diezmos al dep贸sito del templo, para que haya suficiente comida en mi casa. Si lo hacen鈥攄ice el Se帽or de los Ej茅rcitos Celestiales鈥?, les abrir茅 las ventanas de los cielos.隆Derramar茅 una bendici贸n tan grande que no tendr谩n suficiente espacio para guardarla! 隆Int茅ntenlo! 隆P贸nganme a prueba! Sus cosechas ser谩n abundantes porque las proteger茅 de insectos y enfermedades. Las uvas no caer谩n de las vides antes de madurar鈥攄ice el Se帽or de los Ej茅rcitos Celestiales. Entonces todas las naciones los llamar谩n benditos, porque su tierra ser谩 un deleite禄, dice el Se帽or de los Ej茅rcitos Celestiales.*',
        '\n*Malaqu铆as 3: 10 - 12*',
        '\n馃搫 Cantidad de diezmos personales a enviar al Ministerio Puertas Abiertas:',
        '馃搫 Cantidad de ofrendas personales a enviar al Ministerio Puertas Abiertas:'
    ])
    .addAnswer([
        '\n*------驴C脫MO RESPONDER?---------*',
        '\n 1.COPIA Y PEGA EL MENSAJE DE ARRIBA EN LA CASILLA DONDE ESCRIBES',
        '2.AGREGA TUS REPUESTAS A CADA PREGUNTA DESPU脡S DE LOS DOS PUNTOS ":"',
        '3.DALE CLICK A ENVIAR',
        '4.FELICIDADES HAZ COMPLETADO TU INFORME MENSUAL 馃帀 馃コ 馃憦馃徎',
        'Gracias 馃檹馃徎',
        '\n\n馃憠 Responde *Menu* para volver al menu principal.'])

const flowIglesia = addKeyword(['Iglesia', 'iglesia']).addAnswer(
    [
        '*-INFORME ESTADISTICO DE LA IGLESIA-*',
        '\n馃搫 Nombre de la Iglesia:',
        '馃搫 Cantidad de miembros:',
        '馃搫 Cantidad de salvaciones:',
        '馃搫 N煤mero de Bautismos en Agua:',
        '馃搫 N煤mero de Bautismos en el Esp铆ritu Santo',
        '馃搫 N煤mero de ni帽os y adolescentes:',
        '馃搫 N煤mero de j贸venes:',
        '馃搫 N煤mero de muj茅res:',
        '馃搫 N煤mero de hombres:',
        '馃搫 N煤mero de ancianos:',
        '馃搫 N煤mero de c茅lulas que atiende su iglesia y cuantas personas en cada c茅lula:',
        '\n*------------- FINANZAS -------------*',
        '\n馃搫 Cantidad total de ingresos:',
        '馃搫 Cantidad total de egresos:',
        '馃搫 Cantidad en el fondo financiero de la iglesia:',
        '馃搫 Cantidad de diezmos a enviar al Ministerio Puertas Abiertas:',
        '馃搫 Cantidad de ofrendas a enviar al Ministerio Puertas Abiertas:'])
    .addAnswer(['\n*------驴C脫MO RESPONDER?---------*',
        '\n 1.COPIA Y PEGA ESTE MENSAJE EN LA CASILLA DONDE ESCRIBES',
        '2.AGREGA TUS REPUESTAS A CADA PREGUNTA DESPU脡S DE LOS DOS PUNTOS ":"',
        '3.DALE CLICK A ENVIAR',
        '4.FELICIDADES HAZ COMPLETADO TU INFORME MENSUAL 馃帀 馃コ 馃憦馃徎',
        'Gracias 馃檹馃徎',
        '\n\n馃憠 Responde *Menu* para volver al menu principal.'])

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'Gracias por tu sacrificio y tu trabajo en la obra del se帽or. Bendiciones 馃檹馃徎',
    ],
    null,
    null,
    [flowSecundario]
)

const flowAyuda= addKeyword(['ayuda']).addAnswer(
    [
        'Por favor describa la ayuda que necesita y lo contactaremos lo antes posible.',
        '\n\n馃憠 Responde *Menu* para volver al menu principal.',
    ])

const flowPrincipal = addKeyword(['hola', 'buenas','menu'])
    .addAnswer('馃檶 Hola bienvenido al *Ministerio Puertas Abiertas* 馃拻')
    .addAnswer(
        [
            'Le compartimos  las siguientes opciones:',
            '馃憠 Responde "*Ministro*" para llenar su informe mensual ministerial',
            '馃憠 Responde "*Iglesia*"  para llenar el informe mensual de su iglesia local',
            '馃憠 Responde "*Ayuda*" para solicitar asistencia',
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
