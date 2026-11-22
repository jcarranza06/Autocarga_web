// Diccionario en español. Mantén las mismas claves que en en.js.
export default {
  // SEO: título ≈ 50-60 caracteres, descripción ≈ 140-160 caracteres
  meta: {
    home: {
      title: 'Instalación de cargadores eléctricos en Bogotá | Autocarga',
      description: 'Instalamos cargadores para vehículos eléctricos en Bogotá: casas, conjuntos, empresas y electrolineras. Ingenieros con certificación RETIE. Cotiza 24/7.',
    },
    about: {
      title: 'Nosotros: ingeniería eléctrica en Bogotá, 15 años | Autocarga',
      description: 'Autocarga: 15 años en ingeniería eléctrica. Instalamos cargadores para vehículos eléctricos y electrolineras en Bogotá con certificación RETIE.',
    },
  },
  rootChoose: 'Elige tu idioma',
  nav: {
    solutions: 'Soluciones',
    benefits: 'Beneficios',
    connectors: 'Conectores',
    faq: 'Preguntas',
    contact: 'Contacto',
    about: 'Nosotros',
    toggleMenu: 'Abrir o cerrar menú',
    home: 'inicio',
    language: 'Idioma',
  },
  hero: {
    eyebrow: 'Cargadores eléctricos en Bogotá',
    titleStart: 'Instalación de cargadores para ',
    titleHighlight: 'vehículos eléctricos',
    titleEnd: ' en Bogotá',
    subtitle: 'Carga tu vehículo eléctrico con facilidad, en casa o en tu lugar de trabajo.',
    text: 'Instalamos cargadores eléctricos de 7 kW, 11 kW y mayor potencia en casas, edificios, conjuntos residenciales, empresas y parqueaderos de todas las localidades de Bogotá, con certificación RETIE.',
    cta: 'Solicitar asesoría',
    card: {
      charging: 'Cargando…',
      complete: 'Carga completa',
      power: 'Potencia',
      energy: 'Energía',
      remaining: 'Restante',
      ready: 'Listo',
    },
    chipYears: 'años de experiencia',
    chipCertified: 'Instalaciones certificadas',
  },
  solutions: {
    eyebrow: 'Nuestras soluciones',
    title: 'Cargadores eléctricos para cada espacio',
    imageLabel: 'Imagen',
    items: [
      { title: 'Garajes residenciales', text: 'Cargadores de pared de 7 kW y 11 kW para tu casa; instalación limpia y discreta.', alt: 'Cargador eléctrico de pared cargando un vehículo eléctrico en un garaje residencial en Bogotá' },
      { title: 'Parqueaderos abiertos', text: 'Cargadores en pequeños pedestales o montados en columnas.', alt: 'Electrolinera en parqueadero abierto con vehículos eléctricos cargando' },
      { title: 'Parqueaderos corporativos', text: 'Electrolineras para empleados, visitantes y vehículos de la empresa.', alt: 'Parqueadero corporativo subterráneo con cargadores para vehículos eléctricos' },
      { title: 'Conjuntos residenciales', text: 'Cargadores eléctricos compartidos o individuales para edificios de apartamentos y conjuntos residenciales.', alt: 'Cargadores eléctricos en el parqueadero subterráneo de un conjunto residencial' },
    ],
  },
  contact: {
    homeEyebrow: 'Asesoría',
    homeTitle: 'Te brindamos asesoría completa para tu proyecto.',
    aboutEyebrow: 'Habla con un experto',
    aboutTitle: 'Recibe asesoría experta para tu proyecto.',
    intro: 'Déjanos tus datos y nuestro equipo te contactará para planear tu proyecto de carga.',
    direct: 'O escríbenos directamente:',
    formTitle: 'Formulario de contacto',
    fields: { name: 'Nombre', city: 'Ciudad', phone: 'Teléfono', email: 'Correo electrónico' },
    errors: {
      name: 'Escribe tu nombre',
      city: 'Escribe tu ciudad',
      phone: 'Escribe un teléfono válido',
      email: 'Escribe un correo válido',
    },
    submit: 'Quiero que me contacten',
    sending: 'Enviando…',
    sendError: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.',
    successTitle: '¡Gracias!',
    successText: 'Recibimos tus datos y te contactaremos pronto.',
    again: 'Enviar otra solicitud',
  },
  benefits: {
    eyebrow: 'Por qué {brand}',
    title: 'Beneficios de instalar tu cargador eléctrico con {brand}',
    items: [
      { title: 'Comodidad y disponibilidad', text: 'Sin ir a una electrolinera: carga tu vehículo eléctrico en casa o en la oficina, cuando mejor se ajuste a tu horario.' },
      { title: 'Ahorro', text: 'Cargar en casa cuesta mucho menos que tanquear con gasolina. Te asesoramos para elegir el cargador correcto sin pagar de más.' },
      { title: 'Seguridad y confiabilidad', text: 'Ingenieros eléctricos y certificación RETIE. Cargadores e instalaciones aptos para uso interior y exterior.' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Preguntas sobre cargadores eléctricos en Bogotá',
    items: [
      {
        q: '¿Qué cargador eléctrico necesito para mi carro en casa?',
        a: 'Para la mayoría de hogares recomendamos un cargador de pared de 7 kW (monofásico) u 11 kW (trifásico). Antes de instalar revisamos tu acometida y el vehículo para elegir la potencia adecuada. También instalamos cargadores de mayor potencia, incluidos los de carga rápida DC para empresas.',
      },
      {
        q: '¿La instalación incluye certificación RETIE?',
        a: 'Sí. Nuestros ingenieros eléctricos diseñan e instalan el punto de carga cumpliendo el RETIE y realizamos la certificación exigida por la normativa colombiana.',
      },
      {
        q: '¿En qué zonas de Bogotá instalan cargadores?',
        a: 'Cubrimos todas las localidades de Bogotá: Usaquén, Chapinero, Santa Fe, San Cristóbal, Usme, Tunjuelito, Bosa, Kennedy, Fontibón, Engativá, Suba, Barrios Unidos, Teusaquillo, Los Mártires, Antonio Nariño, Puente Aranda, La Candelaria, Rafael Uribe Uribe, Ciudad Bolívar y Sumapaz.',
      },
      {
        q: '¿Puedo instalar un cargador en el parqueadero de mi conjunto residencial?',
        a: 'Sí. Te ayudamos con el estudio técnico y la propuesta para la administración, ya sea un cargador individual conectado a tu medidor o una solución compartida para todo el conjunto.',
      },
      {
        q: '¿Pueden montar una electrolinera en mi empresa o parqueadero?',
        a: 'Sí. Diseñamos e instalamos electrolineras para flotas, empleados, visitantes y parqueaderos comerciales, con cargadores AC o DC según el uso, compatibles con conectores Tipo 1, Tipo 2 y GBT.',
      },
      {
        q: '¿Cómo pido una cotización?',
        a: 'Escríbenos por WhatsApp o por correo: respondemos 24/7. También puedes dejar tus datos en el formulario y un ingeniero te contactará para revisar tu proyecto.',
      },
    ],
  },
  connectors: {
    eyebrow: 'Compatibilidad',
    title: 'Tipos de conectores',
    type: 'Tipo',
  },
  about: {
    eyebrow: 'Nosotros',
    titleStart: 'Ingeniería para la ',
    titleHighlight: 'transición energética',
    titleEnd: ' en Colombia.',
    statLine1: 'años de experiencia',
    statLine2: 'en el mercado colombiano',
    mission: 'Misión',
    missionText:
      'Brindar soluciones integrales de ingeniería y servicios eléctricos, desarrollando proyectos que cumplan altos estándares de calidad, seguridad, eficiencia y confiabilidad. Con 15 años de experiencia en el mercado colombiano, ponemos nuestra experticia técnica, conocimiento de la normativa vigente y capacidad de ejecución al servicio de empresas, instituciones y organizaciones, ofreciendo soluciones ajustadas a las necesidades específicas de cada proyecto y contribuyendo al desarrollo de una infraestructura eléctrica moderna, segura y sostenible.',
    vision: 'Visión',
    visionText:
      'Consolidarnos como una empresa líder en el sector eléctrico colombiano, reconocida por nuestra experiencia, excelencia técnica, cumplimiento normativo e innovación en el desarrollo de proyectos y soluciones eléctricas. Buscamos fortalecer nuestra presencia en el mercado, integrar nuevas tecnologías y participar activamente en la transición energética del país, contribuyendo al desarrollo de una infraestructura eficiente, sostenible y preparada para los retos del futuro.',
    offerEyebrow: 'Lo que ofrecemos',
    offerTitle: 'Soluciones a la medida de cada proyecto',
    offering: [
      { title: 'Parqueaderos abiertos', text: 'Cargadores en pequeños pedestales o montados en pared sobre columnas.' },
      { title: 'Parqueaderos corporativos', text: 'Soluciones para empleados, visitantes y vehículos de la empresa.' },
      { title: 'Conjuntos residenciales', text: 'Soluciones de carga compartida para edificios de apartamentos y propiedades multifamiliares.' },
    ],
  },
  footer: {
    tagline: 'Instalación de cargadores para vehículos eléctricos y electrolineras en Bogotá. Atención 24/7 por WhatsApp y correo.',
    rights: 'Todos los derechos reservados.',
  },
}
