class User < ApplicationRecord
    has_many :trips, dependent: :destroy
    has_many :activities, through: :trips

    has_secure_password
    PASSWORD_REQUIREMENTS = /\A
        (?=.{8,}) #minimum 8 chars long
        (?=.*\d) #contain at least one number
        (?=.*[a-z]) #contain at least one lowercase letter
        (?=.*[A-Z]) #at least one uppercase letter
        (?=.*[[:^alnum:]]) #at least one symbol
    /x

    validates :name, :username, :bio, presence: true
    validates :password, presence: true, format: { with: PASSWORD_REQUIREMENTS, message: "Must be at least 8 characters, include at least one upper case letter, one lower case letter, one number and one symbol."}, on: :create
    validates :username, uniqueness: true
    #custom validation for updatating a user profile WITHOUT requiring a passowd!!
    
end
