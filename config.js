var config = {
  user: {
    // admin, senior, junior, readonly, untrusted
    business_logo: 'public/business_data/1/logo.jpg',
    business_name: 'Beauty and cosmetics salons',
    business_address: '11301 West Olympic Boulevard, Apt.100',
    permission_level: 'admin',
    business_id: 123,
    worker_id: 1
  },
  plugins_list: ['base', 'multiple_workers', 'colors', 'big_gallery', 'highres_photos', 'medical_records'],
  MAX_ASCII_PAGE: 160,
  MAX_ASCII_NEXT_PAGES: 146,
  MAX_UNICODE_FIRST_PAGE: 70,
  MAX_UNICODE_NEXT_PAGES: 63,
  sms_bank: 150,
  max_sms_pages: 4,
  sms_page_size: 150,
  isRTL: false,
  menu: [
    { text: 'calendar', link: '/en/calendar', icon: 'calendar.jpg' },
    { text: 'clients_list', link: '/en/clients_list', icon: 'clients_list.jpg' },
    { text: 'reminders', link: '/en/reminders', icon: 'reminders.jpg' },
    { text: 'groups', link: '/en/groups', icon: 'groups.jpg' },
    { text: 'services', link: '/en/services', icon: 'services.jpg' },
    { text: 'support', link: '/en/support', icon: 'support.jpg' },
    { text: 'suggest_feature', link: '/en/suggest_feature', icon: 'suggest_feature.jpg' },
    { text: 'rate_us', link: '/en/rate_us', icon: 'rate_us.jpg' },
    { text: 'logout', link: '/e n/logout', icon: 'logout.jpg' }
  ],
  translations: {
    menu: {
      calendar: 'Calendar',
      clients_list: 'Clients list',
      reminders: 'Reminders',
      groups: 'Groups',
      services: 'Services',
      support: 'Support',
      suggest_feature: 'Suggest a feature',
      rate_us: 'Rate us',
      logout: 'Log out'
    },
    bulk_sms: {
      main_title: 'Bulk SMS',
      recipients_label: 'Recipients:',
      amt_clients: '{amt} clients',
      bulk_sms_form: {
        input_placeholder: 'Text message',
        characters_label: 'Characters:',
        preview_btn_label: 'preview',
        tags_strip_title: 'Tags(quick fill):',
        cancel_btn_label: 'Cancel',
        send_btn_label: 'Send'
      },
      preview_popup: {
        title_label: 'SMS Preview',
        button_label: 'Okay'
      }
    },
    templates: 'Templates',
    add_template: 'Add template',
    title: 'Title',
    title_pl: 'Enter the title',
    content: 'Content',
    message_pl: 'Enter the message',
    tags_label: 'Tags',
    save: 'Save',
    cancel: 'Cancel',
    preview: 'Preview',
    message: 'The length of the message has exceeded {pages} pages, are you sure you want to send such a long message?',
    del_template: 'Are you sure you want to delete this template?',
    delete: 'Delete',
    delete_tem: 'Delete template',
    edit_template: 'Edit template',
    new_message: 'New message',
    load_template: 'Load template',
    message_text: 'Message text',
    send: 'Send',
    templates_list: 'Templates list',
    to_templates_list: 'To templates list',
    message_pl_send_sms: 'Enter the message using the tags below',
    close: 'Close',
    success_sent: 'Message successfully sent',
    failed_sent: 'SMS sending failed',
    failed_sent_message: 'Server doesn`n respond - pls retry later',
    retry: 'Retry',
    sms_exhausted: 'Stock SMS exhausted',
    back: 'Back',
    up_balance: 'Top up balance',
    // tags: {
    //   business_name: 'Business Name',
    //   business_phone_number: 'Business Phone Number',
    //   business_address: 'Business Address',
    //   business_facebook_link: 'Business Facebook Link',
    //   business_website_link: 'Business Website Link',
    //   client_first_name: 'Client First Name',
    //   client_last_name: 'Client Last Name',
    //   client_next_appointment_date: 'Client Next Appointment Date',
    //   client_next_appointment_time: 'Client Next Appointment Time',
    //   client_next_appointment_procedures_list: 'Client Next Appointment Procedures List',
    //   online_booking_link: 'Our Online Booking Link'
    // }
    tags: {
      business_name: {
        label: "Business Name",
        preview_text: "Hair Style Ashdod",
        average_length: 17,
      },
      business_phone_number: {
        label: "Business Phone Number",
        preview_text: "0541234567",
        average_length: 10,
      },
      business_location: {
        label: "Business Address",
        preview_text: "Rival St 32, Tel Aviv-Yafo",
        average_length: 26,
      },
      business_facebook_url: {
        label: "Business Facebook Link",
        preview_text: "https://www.facebook.com/lista.crm/",
        average_length: 36,
      },
      business_website_url: {
        label: "Business Website",
        preview_text: "https://lista-crm.com/en/home",
        average_length: 23,
      },
      client_name: {
        label: "Client Name",
        preview_text: "Vasiliy",
        average_length: 6,
      },
    },
    unsubscribe_link: {
      preview_text: "To unsubscribe click here: https://lista-crm.com/unsubscribe",
		  average_length: 60,
    }

  },
  templates: [
    {
      id: 1,
      name: 'Greeting massage for a new client',
      type: 'common',
      text: 'Dear $$client_first_name$$, It s great pleasure to meet you. You re always welcome at $$business_address$$, feel free to call us any time by $$business_phone_number$$'
    },
    {
      id: 2,
      name: 'Next Appointment reminder',
      type: 'special',
      text: 'Dear $$client_first_name$$, I want to remind you about your appointment at $$business_address$$ at $$client_next_appointment_date$$ $$client_next_appointment_time$$'
    }
  ],
  urls: {
    main: 'https://api.bewebmaster.co.il',
    templates: '/templates',
    media: './dist/media/',
    menu_icons: './dist/menu/',
    send_sms: '/send-sms'
  },
  // tags_list: {
  //   business_name: {
  //     value: 'Hair Style Ashdod',
  //     average_length: 17
  //   },
  //   business_phone_number: {
  //     value: '0541234567',
  //     average_length: 10
  //   },
  //   business_address: {
  //     value: 'Rival St 32, Tel Aviv-Yafo',
  //     average_length: 26
  //   },
  //   business_facebook_link: {
  //     value: 'https://www.facebook.com/bewebmaster',
  //     average_length: 36
  //   },
  //   business_website_link: {
  //     value: 'http://aquaplants.co.il',
  //     average_length: 23
  //   },
  //   client_first_name: {
  //     value: 'ישראל',
  //     average_length: 6
  //   },
  //   client_last_name: {
  //     value: 'ישראלי',
  //     average_length: 6
  //   },
  //   client_next_appointment_date: {
  //     value: '2017-11-01',
  //     average_length: 10
  //   },
  //   client_next_appointment_time: {
  //     value: '11:11',
  //     average_length: 5
  //   },
  //   client_next_appointment_procedures_list: {
  //     value: 'hair styling, Massage, Acupuncture',
  //     average_length: 34
  //   },
  //   online_booking_link: {
  //     value: 'http://fashion-in-israel.com',
  //     average_length: 28
  //   }
  // }
}
