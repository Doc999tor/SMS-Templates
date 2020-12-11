var config = {
  sms_credits: 150,
  sms_page_size: 201,
  isRTL: false,
  translations: {
    bulk_sms: {
      main_title: 'Bulk SMS',
      recipients_label: 'Recipients:',
      quantity_clients: '{quantity} clients',
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
    sending_popup: {
      success: 'Bulk SMS sent successfully!',
      sending: 'Sending'
    },
    no_sms_popup: {
      text_label: 'You don’t have SMS to send this message! Buy SMS and try again please.',
      buy_btn_lable: 'Buy sms'
    },
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
      name: "Greeting massage for a new client",
      type: "common",
      text: "Dear $$client_first_name$$, It's great pleasure to meet you. You're always welcome at $$business_address$$, feel free to call us any time by $$business_phone_number$$",
    },
    {
      id: 2,
      name: "Next Appointment reminder",
      type: "special",
      text: "Dear $$client_first_name$$, I want to remind you about your appointment at $$business_address$$ at $$client_next_appointment_date$$ $$client_next_appointment_time$$",
    },
  ],
  urls: {
    media: './dist/media/',
    send_sms: 'https://api.bewebmaster.co.il/send-sms'
  },
  tag_list: {
    business_name: "$$business_name$$",
    business_phone_number: "$$business_phone_number$$",
    business_location: "$$business_location$$",
    business_facebook_url: "$$business_facebook_url$$",
    business_website_url: "$$business_website_url$$",
    client_name: "$$client_name$$",
    sms_settings_link: 'en/setting/sms'
  },
}
