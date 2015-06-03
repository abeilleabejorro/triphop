class MyMailer < Devise::Mailer
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views
  default from: "triphophq@gmail.com"
  def add_member(user, trip)
    @trip = trip
    @email = user.email
    mail(to: @email, subject: "test")
  end

end
