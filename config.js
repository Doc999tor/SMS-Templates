var config = {
  sms_bank: 150,
  max_sms_pages: 4,
  // isRtL: true,
  translations: {
    templates: 'Templates',
    add_templates: 'Add template',
    name: 'Name',
    name_placeholder: 'Enter the name of the template',
    text: 'Template`s text',
    text_placeholder: 'Enter the text of the template',
    tags_label: 'Tags',
    tags: {
      business_name: 'Business Name',
      business_phone_number: 'Business Phone Number',
      business_address: 'Business Address',
      business_facebook_link: 'Business Facebook Link',
      business_website_link: 'Business Website Link',
      client_first_name: 'Client First Name',
      client_last_name: 'Client Last Name',
      client_next_appointment_date: 'Client Next Appointment Date',
      client_next_appointment_time: 'Client Next Appointment Time',
      client_next_appointment_procedures_list: 'Client Next Appointment Procedures List',
      online_booking_link: 'Our Online Booking Link'
    }
  },
  templates: [
    {
      id: 1,
      name: 'Greeting massage for a new client',
      text: 'Dear $$client_first_name$$, It s great pleasure to meet you. You re always welcome at $$business_address$$, feel free to call us any time by $$business_phone_number$$'
    },
    {
      id: 2,
      name: 'Next Appointment reminder',
      text: 'Dear $$client_first_name$$, I want to remind you about your appointment at $$business_address$$ at $$client_next_appointment_date$$ $$client_next_appointment_time$$'
    }
  ],
  urls: {
    client_profile_img_prefix: './dist/media/clients-img/',
    get_clients: '/reminders/clients?q={query}',
    main: 'http://api.bewebmaster.co.il',
    reminders: '/reminders',
    media: './dist/media/'
  },
  tags_list: {
    business_name: {
      value: 'Hair Style Ashdod',
      average_length: 17
    },
    business_phone_number: {
      value: '0541234567',
      average_length: 10
    },
    business_address: {
      value: 'Rival St 32, Tel Aviv-Yafo',
      average_length: 26
    },
    business_facebook_link: {
      value: 'https://www.facebook.com/bewebmaster',
      average_length: 36
    },
    business_website_link: {
      value: 'http://aquaplants.co.il',
      average_length: 23
    },
    client_first_name: {
      value: 'ישראל',
      average_length: 6
    },
    client_last_name: {
      value: 'ישראלי',
      average_length: 6
    },
    client_next_appointment_date: {
      value: '2017-11-01',
      average_length: 10
    },
    client_next_appointment_time: {
      value: '11:11',
      average_length: 5
    },
    client_next_appointment_procedures_list: {
      value: 'hair styling, Massage, Acupuncture',
      average_length: 34
    },
    online_booking_link: {
      value: 'http://fashion-in-israel.com',
      average_length: 28
    }
  }
}
