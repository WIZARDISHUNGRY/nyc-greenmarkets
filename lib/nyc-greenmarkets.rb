require 'geocoder'
require "open-uri"
require 'json'

class Greenmarket
	def download(src,dst)
		remote = open(src)
		File.open(dst, 'w') do |f|
			while (line = remote.gets)
				f.write(line)
			end
		end
	end

	def transform(src,dst)
		j = JSON.parse File.read(src)
		columns = j["meta"]["view"]["columns"].collect{|c| c['name'].strip }
    # ["sid", "id", "position", "created_at", "created_meta", "updated_at", "updated_meta", "meta", "Borough", "Market Name", "Street Address", "Day(s)", "Hours", "Distribute Health Bucks", "Accepts Health Bucks", "EBT", "Stellar"]
		rows = j['data'].collect do |row|
			row = Hash[*columns.zip(row).flatten]
			row['geo'] = geocode(row)
			row
		end
		#return
		File.open(dst, 'w') do |f|
			f.write("var markets = #{rows.to_json};")
		end
	end

	def geocode(row,count=0)
		#puts "-- #{row['Street Address']}"
		addr = "#{row['Street Address']}"
		addr.sub!( / [&] /, ' and ')
		addr.sub!( / bet .+ and /, ' and ')
		addr.sub!( / Aves/, ' Ave')
		addr.sub!( / Sts/, ' St')
		addr.sub!( /, .+/, '')
		addr += " #{row['Borough']}, NY"
		#puts addr
		#return

		begin
			geo = Geocoder.search(addr) .first .data .to_hash
		rescue Exception => e
			count+=1
			puts e.message
			puts e.backtrace.inspect
			if count <= 5
				sleep (count*count*2)
				return geocode(row,count)
			else
				raise e
			end
		end
		return geo
	end
end
