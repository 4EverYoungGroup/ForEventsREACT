export const es = {
  ra: {
    page: {
      dashboard: "Inicio "
    },
    action: {
      export: "Exportar (CSV)",
      sort: "Ordenar"
    },
    navigation: {
      page_rows_per_page: "Registros por página:"
    },
    message: {
      invalid_form: "Datos inválidos. Por favor corrija los errores detectados"
    }
  },
  app: {
    user_or_pass_wrong: "Usuario o contraseña incorrectos",
    user_email_duplicated: "El email indicado ya se encuentra en uso",
    user_or_password_wrong: "Usuario o contraseña incorrectos",
    "Not Found": "Sin resultados",
    invalid_format_city: "Formato incorrecto (Población)",
    invalid_format_mobile_number: "Formato incorrecto (Móvil)",
    invalid_format_phone_number: "Formato incorrecto (Teléfono)",
    invalid_format_email: "Formato incorrecto (Email)",
    invalid_format_begin_date: "Fecha incorrecta (Inicio)",
    invalid_date: "Fecha incorrecta",
    invalid_format_end_date: "Fecha incorrecta (Fin)",
    error_saving_data: "Error Inesperado del Servidor (500)"
  },
  resources: {
    admins: {
      name: "Administradores",
      fields: {
        first_name: "Nombre",
        last_name: "Apellido(s)",
        profile: "Perfil",
        email: "Email"
      }
    },
    organizers: {
      name: "Organizadores",
      fields: {
        first_name: "Nombre",
        last_name: "Apellido(s)",
        profile: "Perfil",
        email: "Email",
        address: "Dirección",
        zip_code: "Código Postal",
        city: "Población",
        province: "Provincia",
        country: "País",
        idn: "CIF",
        company_name: "Razón Social",
        mobile_number: "Móvil",
        phone_number: "Teléfono",
        website: "Sitio Web"
      }
    },
    users: {
      name: "Usuarios",
      fields: {
        first_name: "Nombre",
        last_name: "Apellido(s)",
        profile: "Perfil",
        email: "Email"
      }
    },
    eventtypes: {
      name: "Categorías",
      fields: {
        id: "ID",
        name: "Nombre"
      }
    },
    events: {
      name: "Eventos",
      fields: {
        id: "ID",
        organizer: "Organizador",
        begin_date: "Fecha/hora de Inicio",
        end_date: "Fecha/hora de Fin",
        name: "Nombre",
        location: "Posición",
        event_type: "Categoría",
        city: "Población",
        user: "Asistentes",
        transaction: "Transacciones",
        media: "Fotos",
        adress: "Dirección",
        zip_code: "Código Postal",
        province: "Provincia",
        country: "País",
        indoor: "Local Cerrado",
        max_visitors: "Aforo Máximo",
        free: "Gratuito",
        price: "Precio",
        min_age: "Edad Mínima",
        description: "Descripción",
        create_date: "Fecha de Creación"
      }
    }
  }
};
