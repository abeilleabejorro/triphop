class ProposedDatesController < ApplicationController
	helper_method :date_params

  def new_date
    @dates = ProposedDate.create(reformat_dates)
    @dates.trip_id = params["proposed_date"]["trip_id"].to_i
    @dates.user_id = current_user.id
    @dates.save

    respond_to do |f|
      f.js
    end
  end

  def date_params
    params.require(:proposed_dates).permit(:start, :end)
  end

  private

  def reformat_dates
    start_date_array=params["proposed_date"]["start"].split("/")
    end_date_array=params["proposed_date"]["end"].split("/")
    start_date = start_date_array.insert(0, start_date_array.delete_at(2)).join("/")
    end_date = end_date_array.insert(0, end_date_array.delete_at(2)).join("/")
    formatted_dates={start: start_date, end: end_date}
  end
end

