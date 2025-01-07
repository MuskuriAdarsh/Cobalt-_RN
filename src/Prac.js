import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Select,SelectContent,SelectBackdrop,SelectDragIndicatorWrapper,SelectItem,SelectIcon,SelectTrigger ,SelectInput ,SelectPortal} from '../components/ui/select'
const parc = () => {
  return (
    <View>
      <Text>parc</Text>
      
      <Select>
          <SelectTrigger variant="rounded" size="md" >
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop/>
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="UX Research" value="ux" />
              <SelectItem label="Web Development" value="web" />
              <SelectItem
                label="Cross Platform Development Process"
                value="Cross Platform Development Process"
              />
              <SelectItem
                label="UI Designing"
                value="ui"
                isDisabled={true}
              />
              <SelectItem
                label="Backend Development"
                value="backend"
              />
            </SelectContent>
          </SelectPortal>
        </Select>
      
    </View>
  )
}

export default parc

const styles = StyleSheet.create({})